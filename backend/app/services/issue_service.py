import uuid
import datetime
from sqlalchemy.orm import Session

from ..exceptions import issue_not_found
import uuid
import datetime

from sqlalchemy.orm import Session

from ..exceptions import issue_not_found
from ..enums import PriorityEnum, StatusEnum
from ..models import Issue, User
from ..schemas import ( IssueCreate, IssueListResponse, IssueUpdate)


def create_issue(
    db: Session,
    issue: IssueCreate,
    current_user: User,
):

    new_issue = Issue(
        id=str(uuid.uuid4()),
        title=issue.title,
        description=issue.description,
        status=StatusEnum.open,
        priority=issue.priority,
        date_added=datetime.datetime.utcnow(),
        date_completed=None,
        owner_id=current_user.id,
    )

    db.add(new_issue)
    db.commit()
    db.refresh(new_issue)

    return new_issue


def read_issues(
    db: Session,
    current_user: User,
    status: StatusEnum | None = None,
    priority: PriorityEnum | None = None,
    skip: int = 0,
    limit: int = 10,
):

    query = db.query(Issue).filter(
        Issue.owner_id == current_user.id
    )

    if status is not None:
        query = query.filter(
            Issue.status == status
        )

    if priority is not None:
        query = query.filter(
            Issue.priority == priority
        )

    total = query.count()

    items = (
        query
        .offset(skip)
        .limit(limit)
        .all()
    )

    return IssueListResponse(
        items=items,
        total=total,
        skip=skip,
        limit=limit,
    )


def read_issue(
    db: Session,
    id: str,
    current_user: User,
):

    issue = (
        db.query(Issue)
        .filter(
            Issue.id == id,
            Issue.owner_id == current_user.id,
        )
        .first()
    )

    if issue is None:
        raise issue_not_found()

    return issue


def update_issue(
    db: Session,
    id: str,
    updated_issue: IssueUpdate,
    current_user: User,
):

    issue = (
        db.query(Issue)
        .filter(
            Issue.id == id,
            Issue.owner_id == current_user.id,
        )
        .first()
    )

    if issue is None:
        raise issue_not_found()

    if updated_issue.title is not None:
        issue.title = updated_issue.title

    if updated_issue.description is not None:
        issue.description = updated_issue.description

    if updated_issue.priority is not None:
        issue.priority = updated_issue.priority

    if updated_issue.status is not None:

        issue.status = updated_issue.status

        if updated_issue.status == StatusEnum.closed:

            if issue.date_completed is None:
                issue.date_completed = datetime.datetime.utcnow()

        else:

            issue.date_completed = None

    db.commit()
    db.refresh(issue)

    return issue


def delete_issue(
    db: Session,
    id: str,
    current_user: User,
):

    issue = (
        db.query(Issue)
        .filter(
            Issue.id == id,
            Issue.owner_id == current_user.id,
        )
        .first()
    )

    if issue is None:
        raise issue_not_found()

    db.delete(issue)
    db.commit()

    return issue