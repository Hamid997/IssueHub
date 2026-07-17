from .enums import StatusEnum, PriorityEnum
from pydantic import BaseModel, ConfigDict, EmailStr, Field
import datetime

# Issues

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
    model_config = ConfigDict(from_attributes=True)
    id: str
    title: str
    description: str | None = None
    status: StatusEnum
    priority: PriorityEnum
    date_added: datetime.datetime
    date_completed: datetime.datetime | None = None

class IssueListResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    items: list[IssueResponse]
    total: int
    skip: int
    limit: int

# Users

class UserCreate(BaseModel):
    username: str = Field( min_length=3, max_length=30 )
    email: EmailStr
    password: str = Field( min_length=6 )

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    username: str 
    email: EmailStr
    avatar_url: str | None = None
    date_created: datetime.datetime

# Authentication

class Token(BaseModel):
    access_token: str
    token_type: str

class ChangePasswordRequest(BaseModel):
    current_password: str = Field(min_length=8)
    new_password: str = Field(min_length=8)
    confirm_password: str = Field(min_length=8)
