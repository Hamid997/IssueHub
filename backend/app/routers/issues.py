from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..security import get_current_user
from ..models import User
from ..enums import PriorityEnum, StatusEnum
from ..schemas import IssueCreate, IssueListResponse, IssueResponse, IssueUpdate
from ..services import issue_service

router = APIRouter(
    prefix="/issues",
    tags=["Issues"],
)


@router.post("/", status_code=status.HTTP_201_CREATED,response_model=IssueResponse)
async def create_issue(
    issue: IssueCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> IssueResponse:
    return issue_service.create_issue(        
        db=db,
        issue=issue,
        current_user=current_user
    )


@router.get("/", status_code=status.HTTP_200_OK,response_model=IssueListResponse)
async def get_issues(
    status: StatusEnum | None = None,
    priority: PriorityEnum | None = None,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> IssueListResponse:
    return issue_service.read_issues(
        db=db,
        status=status,
        priority=priority,
        skip=skip,
        limit=limit,
        current_user=current_user,
    )


@router.get("/{id}", response_model=IssueResponse)
async def read_issue(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    ) -> IssueResponse:
    return issue_service.read_issue(        
        db=db,
        id=id,
        current_user=current_user
    )


@router.put("/{id}", response_model=IssueResponse)
def update_issue(
    id: str,
    updated_issue: IssueUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
    ) -> IssueResponse:
    return issue_service.update_issue(        
        db=db,
        id=id,
        updated_issue=updated_issue,
        current_user=current_user,
    )


@router.delete("/{id}", response_model=IssueResponse)
def delete_issue(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
    ) -> IssueResponse:
    return issue_service.delete_issue(
        db=db,
        id=id,
        current_user=current_user,
    )