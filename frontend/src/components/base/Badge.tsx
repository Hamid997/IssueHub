import { ISSUE_PRIORITY, ISSUE_STATUS } from "../../constants/issue";

type BadgeVariant =
    | (typeof ISSUE_STATUS)[number]
    | (typeof ISSUE_PRIORITY)[number];

interface BadgeProps {
    variant: BadgeVariant;
    children: React.ReactNode;
}

export default function Badge({ children, variant }: BadgeProps) {
    return (
        <span className={`badge badge-${variant}`}>
            {children}
        </span>
    );
}