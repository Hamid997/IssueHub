import type { IssueResponse } from "../types/Issue";

interface UseIssueFilterProps {
    issues: IssueResponse[];
    search: string;
    status: string;
}

export default function useIssueFilter({
    issues,
    search,
    status,
}: UseIssueFilterProps) {

    return issues.filter((issue) => {

        const matchSearch =
            issue.title
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchStatus =
            status === "" ||
            issue.status === status;

        return matchSearch && matchStatus;

    });

}