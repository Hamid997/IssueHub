import { useState } from "react";

import Button from "../base/Button";
import Input from "../base/Input";
import Textarea from "../base/Textarea";
import Select from "../base/Select";

import type { IssueResponse } from "../../types/Issue";

interface IssueFormProps {
    issue?: IssueResponse;

    showStatus?: boolean;

    loading?: boolean;

    // error?: string;

    onSubmit?: (data: {
        title: string;
        description: string;
        priority: string;
        status?: string;
    }) => void;

    onCancel?: () => void;
}

export default function IssueForm({
    loading, showStatus,
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

<p>Title</p>
            <Input
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />

<p>Description</p>
            <Textarea
                value={description}
                placeholder="Describe the issue..."
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <div className="form-row">

                <div>
                    <p>Priority</p>
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
                </div>

                {showStatus && (
                    <div>
                        <p>Status</p>
                        <Select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value as "open" | "in_progress" | "closed")
                            }
                        >
                            <option value="open">
                                Open
                            </option>

                            <option value="in_progress">
                                In progress
                            </option>

                            <option value="closed">
                                Closed
                            </option>

                        </Select>
                    </div>
                )}

            </div>

            <div className="form-actions">

                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button type="submit" disabled={loading}>

                    {loading
                        ? "Saving..."
                        : issue
                            ? "Update"
                            : "Add issue"}

                </Button>

            </div>

            {/* {error &&
                <p className="error">
                    {error}
                </p>
            } */}
        </form>

    );
}
