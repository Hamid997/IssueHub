export default function IssueRowSkeleton() {

    return (

        <div className="issue-row">

            <div className="issue-cell">
                <div className="skeleton skeleton-title"></div>
            </div>

            <div className="issue-cell">
                <div className="skeleton skeleton-description"></div>
            </div>

            <div className="issue-cell">
                <div className="skeleton skeleton-badge"></div>
            </div>

            <div className="issue-cell">
                <div className="skeleton skeleton-badge"></div>
            </div>

            <div className="issue-cell">
                <div className="skeleton skeleton-date"></div>
            </div>

            <div className="issue-cell">
                <div className="skeleton skeleton-date"></div>
            </div>

        </div>

    );

}