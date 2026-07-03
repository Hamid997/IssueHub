import datetime
from enum import Enum

from fastapi import FastAPI, status, HTTPException
from pydantic import BaseModel

app = FastAPI()

class StatusEnum(str, Enum):
    open = "open"
    in_progress = "in_progress"
    closed = "closed"

class PriorityEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Issue(BaseModel):
    id: str
    title: str
    description: str | None = None
    status: StatusEnum = StatusEnum.open
    priority: PriorityEnum
    date_added: datetime.datetime
    date_completed: datetime.datetime | None = None

issues = []

@app.post("/issues/", status_code=status.HTTP_201_CREATED)
async def create_issue(issue: Issue) -> Issue:
    issues.append(issue)
    return issue

@app.get("/issues/", status_code=status.HTTP_200_OK, response_model=list[Issue])
async def get_issues() -> list[Issue]:
    return issues

@app.get("/issues/{id}", response_model=Issue)
async def read_issue(id: str) -> Issue:
    for issue in issues:
        if issue.id == id:
            return issue
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Issue not found"
    )


@app.put("/issues/{id}", response_model=Issue)
def update_issue(id: str, updated_issue: Issue) -> Issue:
    for index, issue in enumerate(issues):
        if issue.id == id:
            issues[index] = updated_issue
            return updated_issue

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Issue not found"
    )


@app.delete("/issues/{id}", response_model=Issue)
def delete_issue(id: str) -> Issue:
    for index, issue in enumerate(issues):
        if issue.id == id:
            del issues[index]
            return issue

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Issue not found"
    )
