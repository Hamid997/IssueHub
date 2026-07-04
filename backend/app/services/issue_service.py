import datetime
import uuid

from ..storage import load_issues, save_issues
from ..exceptions import issue_not_found
from ..models import PriorityEnum, StatusEnum
from ..schemas import IssueCreate, IssueResponse, IssueUpdate

def create_issue(issue: IssueCreate) -> IssueResponse:
    issues = load_issues()
    u_id = uuid.uuid4()
    date = datetime.datetime.now()
    new_issue = IssueResponse(
        id=str(u_id),
        title=issue.title,
        description=issue.description,
        status=StatusEnum.open,
        priority=issue.priority,
        date_added=date,
        date_completed=None,
    )
    issues.append(new_issue)
    save_issues(issues)
    return new_issue

def read_issues(status: StatusEnum | None = None, priority: PriorityEnum | None = None, skip: int = 0, limit: int = 10,) -> list[IssueResponse]:
    issues = load_issues()
    filtered_issues = issues
    if status is not None:
        filtered_issues = [
            issue
            for issue in filtered_issues
            if issue.status == status
        ]
    if priority is not None:
        filtered_issues = [
            issue
            for issue in filtered_issues
            if issue.priority == priority
        ]
    return filtered_issues[skip: skip + limit]

def read_issue(id: str) -> IssueResponse:
    issues = load_issues()
    for issue in issues:
        if issue.id == id:
            return issue
    raise issue_not_found()

def update_issue(id: str, updated_issue: IssueUpdate) -> IssueResponse:
    issues = load_issues()
    for index, issue in enumerate(issues):

        if issue.id == id:
            if (updated_issue.status == StatusEnum.closed and issue.status != StatusEnum.closed):
                date_completed = datetime.datetime.now()
            elif updated_issue.status == StatusEnum.open:
                date_completed = None
            else:
                date_completed = issue.date_completed

            update_issue_response = IssueResponse(
                id=issue.id,
                title=updated_issue.title if updated_issue.title is not None else issue.title,
                description=updated_issue.description if updated_issue.description is not None else issue.description,
                status=updated_issue.status if updated_issue.status is not None else issue.status,
                priority=updated_issue.priority if updated_issue.priority is not None else issue.priority,
                date_added=issue.date_added,
                date_completed=date_completed,
            )

            issues[index] = update_issue_response
            save_issues(issues)
            return update_issue_response

    raise issue_not_found()

def delete_issue(id: str) -> IssueResponse:
    issues = load_issues()
    for index, issue in enumerate(issues):
        if issue.id == id:
            del issues[index]
            save_issues(issues)
            return issue

    raise issue_not_found()
