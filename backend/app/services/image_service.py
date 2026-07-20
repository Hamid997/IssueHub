import os

import cloudinary
import cloudinary.uploader

from fastapi import (UploadFile, HTTPException, status)
from sqlalchemy.orm import Session

from ..models import User
from ..config import settings

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)

ALLOWED_TYPES = {
    "image/png",
    "image/jpeg",
    "image/webp",
}

MAX_SIZE = settings.MAX_IMAGE_SIZE


def upload_avatar(
    db: Session,
    current_user: User,
    file: UploadFile,
) -> User:
    
    # Validate image type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid image type.",
        )

    # Validate image size
    file.file.seek(0, os.SEEK_END)
    size = file.file.tell()
    file.file.seek(0)

    if size > MAX_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image is too large.",
        )
    

    # Upload image to Cloudinary
    result = cloudinary.uploader.upload(
        file.file,
        folder="issuehub/avatars",
    )

    # Save image URL in database
    current_user.avatar_url = result["secure_url"]


    db.commit()
    db.refresh(current_user)

    return current_user