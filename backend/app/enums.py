from enum import Enum

class StatusEnum(str, Enum):
    open = "open"
    in_progress = "in_progress"
    closed = "closed"

class PriorityEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
