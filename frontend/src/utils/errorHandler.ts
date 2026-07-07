import axios from "axios";

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {

        if (!error.response) {
            return "Cannot connect to the server.";
        }

        switch (error.response.status) {
            case 400:
                return "Bad request.";

            case 404:
                return "Resource not found.";

            case 422:
                if (
                    Array.isArray(error.response.data.detail) &&
                    error.response.data.detail.length > 0
                ) {
                    const message = error.response.data.detail[0].msg;

                    if (message.includes("at least 10")) {
                        return "Title must contain at least 10 characters.";
                    }

                    if (message.includes("at most 50")) {
                        return "Title must contain at most 50 characters.";
                    }

                    return message;
                }
                return "Validation failed.";

            case 500:
                return "Internal server error.";

            default:
                return "Request failed.";
        }
    }

    return "Unexpected error.";
}