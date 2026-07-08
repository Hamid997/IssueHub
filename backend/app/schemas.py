from .models import PriorityEnum, StatusEnum
from pydantic import BaseModel, Field
import datetime

class IssueCreate(BaseModel):
    title: str = Field(min_length=10,max_length=50)
    description: str | None = Field(default=None,max_length=1000)
    priority: PriorityEnum

class IssueUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=10, max_length=50)
    description: str | None = Field(default=None,max_length=1000)
    status: StatusEnum | None = None
    priority: PriorityEnum | None = None

class IssueResponse(BaseModel):
    id: str
    title: str
    description: str | None = None
    status: StatusEnum
    priority: PriorityEnum
    date_added: datetime.datetime
    date_completed: datetime.datetime | None = None

class IssueListResponse(BaseModel):
    items: list[IssueResponse]
    total: int
    skip: int
    limit: int