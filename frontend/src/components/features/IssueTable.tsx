import type { IssueResponse } from "../../types/Issue";
import IssueRow from "./IssueRow";

interface IssueTableProps {
    issues: IssueResponse[];
    onSelect: (issue: IssueResponse) => void;
    onEdit: (issue: IssueResponse) => void;
    onDelete: (id: string) => void;
}

export default function IssueTable({
    issues,
    onSelect,
    onEdit,
    onDelete,
}: IssueTableProps) {
    return (
        <div>
            {issues.map((issue) => (
                <IssueRow
                    key={issue.id}
                    issue={issue}
                    onSelect={onSelect}
                    onEdit={onEdit}
                    onDelete={onDelete}

                />
            ))}
        </div>
    );
}