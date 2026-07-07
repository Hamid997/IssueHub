import { useState } from "react";

import Button from "../base/Button";
import Input from "../base/Input";
import Select from "../base/Select";

import type { IssueResponse } from "../../types/Issue";

interface IssueFormProps {
    issue?: IssueResponse;

    showStatus?: boolean;

    loading?: boolean;

    error?: string;

    onSubmit?: (data: {
        title: string;
        description: string;
        priority: string;
        status?: string;
    }) => void;

    onCancel?: () => void;
}

export default function IssueForm({
    loading, error, showStatus,
    issue, onSubmit, onCancel
}: IssueFormProps) {

    const [title, setTitle] = useState(issue?.title ?? "");

    const [description, setDescription] = useState(
        issue?.description ?? ""
    );

    const [priority, setPriority] = useState(
        issue?.priority ?? "medium"
    );

    const [status, setStatus] = useState(
        issue?.status ?? "open"
    );

    function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        onSubmit?.({
            title,
            description,
            priority,
            status,
        });

    }

    return (

        <form onSubmit={handleSubmit}>

            <Input
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />

            <Input
                value={description}
                placeholder="Description"
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            {showStatus && (

                <Select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value as "open" | "in-progress" | "closed")
                    }
                >
                    <option value="open">
                        Open
                    </option>

                    <option value="in_progress">
                        In Progress
                    </option>

                    <option value="closed">
                        Closed
                    </option>

                </Select>

            )}
            <Select
                value={priority}
                onChange={(e) =>
                    setPriority(e.target.value as "high" | "medium" | "low")
                }
            >
                <option value="high">High</option>

                <option value="medium">
                    Medium
                </option>

                <option value="low">Low</option>

            </Select>

            <div className="form-actions">

                <Button
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button disabled={loading}>

                    {loading
                        ? "Saving..."
                        : issue
                            ? "Update"
                            : "Create"}

                </Button>

            </div>

            {error &&
                <p className="error">
                    {error}
                </p>
            }
        </form>

    );
}
