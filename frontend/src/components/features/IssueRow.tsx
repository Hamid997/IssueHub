import type { IssueResponse } from "../../types/Issue";
import Badge from "../base/Badge";
import { formatDate } from "../../utils/formatDate";

interface IssueRowProps {
    issue: IssueResponse;
    onSelect: (issue: IssueResponse) => void;
}

function formatLabel(value: string) {
    const spaced = value.replace(/[-_]/g, " ");
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export default function IssueRow({
    issue,
    onSelect,
}: IssueRowProps) {

    return (
        <div className="issue-row">

            <div className="issue-cell issue-title">

                <button
                    className="issue-link"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(issue);
                    }}
                >
                    {issue.title}
                </button>

            </div>

            <div className="issue-cell issue-description">

                {issue.description}

            </div>

            <div className="issue-cell">
                <Badge variant={issue.status}>
                    {formatLabel(issue.status)}
                </Badge>
            </div>

            <div className={`issue-cell priority-text priority-${issue.priority}`}>
                <Badge variant={issue.priority}>
                    {formatLabel(issue.priority)}
                </Badge>
            </div>

            <div className="issue-cell issue-date">
                {formatDate(issue.date_added)}
            </div>

            <div className="issue-cell issue-date">
                {formatDate(issue.date_completed)}
            </div>

        </div>
    );
}