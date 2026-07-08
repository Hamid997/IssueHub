interface EmptyStateProps {
  title?: string;
}

export default function EmptyState({
  title = "No issues found",
}: EmptyStateProps) {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        📄
      </div>

      <h2 className="empty-title">
        {title}
      </h2>
    </div>
  );
}