import type { IssueResponse } from "../../types/Issue";
import IssueRow from "./IssueRow";

interface IssueTableProps {
    issues: IssueResponse[];
}

export default function IssueTable({issues}: IssueTableProps) {
    return (
        <div>
            {issues.map((issue) => (
                <IssueRow
                    key={issue.id}
                    issue={issue}
                />
            ))}
        </div>
    );
}