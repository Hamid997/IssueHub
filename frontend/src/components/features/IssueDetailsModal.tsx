import { CalendarDays, CircleCheck } from "lucide-react";
import Modal from "../base/Modal";
import Card from "../base/Card";
import Badge from "../base/Badge";

import { formatDate } from "../../utils/formatDate";
import type { IssueResponse } from "../../types/Issue"
import Button from "../base/Button";

interface IssueDetailsModalProps {
  issue: IssueResponse
  isOpen: boolean
  onClose: () => void
  onEdit: (issue: IssueResponse) => void;
  onDelete: (id: string) => void;
}

function formatLabel(value: string) {
  const spaced = value.replace(/[-_]/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
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
          <Badge variant={issue.status}>{formatLabel(issue.status)}</Badge>
          <Badge variant={issue.priority}>{formatLabel(issue.priority)} priority</Badge>
        </div>
        <p className="details-description">
          {issue.description}
        </p>
        <hr className="details-divider" />
        <div className="details-info">
          <div className="details-row">
            <div className="details-label">
              <CalendarDays size={18} />
              <span>Date Added</span>
            </div>
            <span>
              {formatDate(issue.date_added)}
            </span>
          </div>
          <div className="details-row">
            <div className="details-label">
              <CircleCheck size={18} />
              <span>Date Completed</span>
            </div>
            <span>
              {formatDate(issue.date_completed)}
            </span>
          </div>
        </div>
        <div className="details-actions">

          <Button
            type="button"
            variant="danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(issue.id);
            }}
          >
            Delete
          </Button>

          <Button
            type="button"
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