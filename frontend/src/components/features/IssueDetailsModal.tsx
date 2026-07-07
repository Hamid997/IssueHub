import Modal from "../base/Modal";
import Card from "../base/Card";
import Badge from "../base/Badge";

import type { IssueResponse } from "../../types/Issue"
import Button from "../base/Button";

interface IssueDetailsModalProps {
  issue: IssueResponse
  isOpen: boolean
  onClose: () => void
  onEdit: (issue: IssueResponse) => void;
  onDelete: (id: string) => void;
}

export default function IssueDetailsModal({
  issue, isOpen, onClose, onDelete, onEdit
}: IssueDetailsModalProps) {
  return (
    <Modal
      title="Issue Details"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Card>
        <div className="details-header">
          <h2>{issue.title}</h2>
        </div>
        <div className="details-tags">
          <Badge variant={issue.status}>{issue.status}</Badge>
          <Badge variant={issue.priority}>{issue.priority}</Badge>
        </div>
        <p className="details-description">
          {issue.description}
        </p>
        <hr className="details-divider" />
        <div className="details-info">
          <div className="details-row">
            <span>Date Added</span>
            <span>
              {new Date(issue.date_added).toLocaleDateString()}
            </span>
          </div>
          <div className="details-row">
            <span>Date Completed</span>
            <span>
              {issue.date_completed ? new Date(issue.date_completed).toLocaleDateString() : "-"}
            </span>
          </div>
        </div>
        <div className="details-actions">

          <Button
            variant="danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(issue.id);
            }}
          >
            Delete
          </Button>

          <Button
            variant="primary"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(issue);
            }}
          >
            Edit
          </Button>

        </div>
      </Card>
    </Modal>
  )
}