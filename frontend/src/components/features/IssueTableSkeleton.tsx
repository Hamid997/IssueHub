import IssueRowSkeleton from "./IssueRowSkeleton";

export default function IssueTableSkeleton() {

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

            {Array.from({ length: 4 }).map((_, index) => (
                <IssueRowSkeleton
                    key={index}
                />
            ))}

        </div>

    );

}