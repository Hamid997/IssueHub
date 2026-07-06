import type { IssueResponse } from "../../types/Issue";
import Button from "../base/Button";

interface IssueRowProps {
    issue: IssueResponse;
    onSelect: (issue: IssueResponse) => void;
    onEdit: (issue: IssueResponse) => void;
    onDelete: (id: string) => void;

}

export default function IssueRow({
    issue,
    onSelect,
    onEdit,
    onDelete,
}: IssueRowProps) {
    return (
        <div
            className="issue-row"
            onClick={() => onSelect(issue)}
        >
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <span>{issue.status}</span>
            <span>{issue.priority}</span>
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit(issue);
                }}
            >
                Edit
            </Button>

            <Button
                variant="danger"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(issue.id);
                }}
            >
                Delete
            </Button>

        </div>
    );
}