from pydantic import BaseModel
import datetime
from enum import Enum


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
