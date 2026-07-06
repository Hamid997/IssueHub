import { useState } from "react";

import Button from "../base/Button";
import Input from "../base/Input";
import Select from "../base/Select";

import type { IssueResponse } from "../../types/Issue";

interface IssueFormProps {
    issue?: IssueResponse;
    onSubmit?: (data: {
        title: string;
        description: string;
        priority: string;
    }) => void;
}


export default function IssueForm({ issue, onSubmit }: IssueFormProps) {

    const [title, setTitle] = useState(issue?.title ?? "");

    const [description, setDescription] = useState(
        issue?.description ?? ""
    );

    const [priority, setPriority] = useState(
        issue?.priority ?? "medium"
    );

    
    function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        onSubmit?.({
            title,
            description,
            priority,
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

<Button>

    {issue ? "Update" : "Create"}

</Button>
        </form>

    );
}
