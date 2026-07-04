from fastapi import APIRouter, status

from ..models import PriorityEnum, StatusEnum
from ..schemas import IssueCreate, IssueResponse, IssueUpdate
from ..services import issue_service

router = APIRouter(
    prefix="/issues",
    tags=["Issues"],
)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_issue(issue: IssueCreate) -> IssueResponse:
    return issue_service.create_issue(issue)


@router.get("/", status_code=status.HTTP_200_OK,response_model=list[IssueResponse])
async def get_issues(
    status: StatusEnum | None = None,
    priority: PriorityEnum | None = None,
    skip: int = 0,
    limit: int = 10,
) -> list[IssueResponse]:
    return issue_service.read_issues(status, priority, skip, limit)


@router.get("/{id}", response_model=IssueResponse)
async def read_issue(id: str) -> IssueResponse:
    return issue_service.read_issue(id)


@router.put("/{id}", response_model=IssueResponse)
def update_issue(id: str, updated_issue: IssueUpdate) -> IssueResponse:
    return issue_service.update_issue(id, updated_issue)


@router.delete("/{id}", response_model=IssueResponse)
def delete_issue(id: str) -> IssueResponse:
    return issue_service.delete_issue(id)