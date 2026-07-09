import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthContext from "./useAuthContext";
import authService from "../services/authService";
import { getErrorMessage } from "../utils/errorHandler";

export default function useAuth() {

  const auth = useAuthContext();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    async function login(
        email: string,
        password: string,
    ) {

        try {

            setLoading(true);

            const response = await authService.login({
                email,
                password,
            });

            authService.saveToken(
                response.access_token
            );
auth.login();
            toast.success("Login successful");

            navigate("/");

        } catch (error) {

            toast.error(
                getErrorMessage(error)
            );

        } finally {

            setLoading(false);

        }

    }

    function logout() {

auth.logout();
        navigate("/login");

    }

    return {

        loading,

        login,

        logout,

        isAuthenticated:
            authService.isAuthenticated(),

    };

}