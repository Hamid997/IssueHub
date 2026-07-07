import type { IssueResponse } from "../../types/Issue";
import Badge from "../base/Badge";

interface IssueRowProps {
    issue: IssueResponse;
    onSelect: (issue: IssueResponse) => void;
}

export default function IssueRow({
    issue,
    onSelect,
}: IssueRowProps) {

    return (
        <tr className="issue-row">

            <td className="issue-title">

                <button
                    className="issue-link"
                    onClick={() => onSelect(issue)}
                >
                    {issue.title}
                </button>

            </td>

            <td className="issue-description">

                {issue.description}

            </td>

            <td>

                <Badge variant={issue.status}>
                    {issue.status}
                </Badge>

            </td>

            <td>

                <Badge variant={issue.priority}>
                    {issue.priority}
                </Badge>

            </td>

            <td>

                {issue.date_added
                    ? new Date(issue.date_added).toLocaleDateString()
                    : "-"}

            </td>

            <td>

                {issue.date_completed
                    ? new Date(issue.date_completed).toLocaleDateString()
                    : "-"}

            </td>

        </tr>
    );
}