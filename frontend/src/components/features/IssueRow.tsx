import type { IssueResponse } from "../../types/Issue";

interface IssueRowProps {
    issue: IssueResponse;
}

export default function IssueRow({ issue }: IssueRowProps) {
    return (
        <div className="issue-row">
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <span>{issue.status}</span>
            <span>{issue.priority}</span>
        </div>
    );
}