from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas import ( UserCreate, UserLogin, UserResponse, Token, ChangePasswordRequest )
from ..services import user_service
from ..security import get_current_user
from ..models import User

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

@router.post( 
    "/register", 
    response_model=UserResponse, 
    status_code=status.HTTP_201_CREATED
)
def register_user( user: UserCreate, db: Session = Depends(get_db) ):
    return user_service.create_user( db=db, user=user )

@router.post(
    "/login",
    response_model=Token,
    status_code=status.HTTP_200_OK,
)
def login_user(
    user: UserLogin,
    db: Session = Depends(get_db),
):
    return user_service.authenticate_user(
        db=db,
        user=user,
    )

@router.get(
    "/me",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user

@router.patch(
    "/change-password",
    status_code=status.HTTP_200_OK,
)
def change_password(
    data: ChangePasswordRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return user_service.change_password(
        db=db,
        current_user=current_user,
        data=data,
    )