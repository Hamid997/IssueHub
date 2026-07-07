import type { IssueResponse } from "../../types/Issue";
import IssueRow from "./IssueRow";

interface IssueTableProps {
    issues: IssueResponse[];
    onSelect: (issue: IssueResponse) => void;
}

export default function IssueTable({
    issues,
    onSelect,
}: IssueTableProps) {
    return (
        <div className="issue-table">

            <div className="issue-table-head">
                <span>Issue</span>
                <span>Description</span>
                <span>Status</span>
                <span>Priority</span>
                <span>Date Added</span>
                <span>Date Completed</span>
            </div>

            {issues.map((issue) => (
                <IssueRow
                    key={issue.id}
                    issue={issue}
                    onSelect={onSelect}
                />
            ))}

        </div>
    );
}