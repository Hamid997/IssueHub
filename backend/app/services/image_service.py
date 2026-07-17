import os
import uuid
import shutil

from fastapi import (
    UploadFile,
    HTTPException,
    status,
)

from sqlalchemy.orm import Session

from ..models import User
from ..config import settings


UPLOAD_DIR = settings.UPLOAD_DIR

ALLOWED_TYPES = {
    "image/png",
    "image/jpeg",
    "image/webp",
}

MAX_SIZE = settings.MAX_IMAGE_SIZE


os.makedirs(
    UPLOAD_DIR,
    exist_ok=True,
)


def upload_avatar(
    db: Session,
    current_user: User,
    file: UploadFile,
) -> User:

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid image type.",
        )

    file.file.seek(0, os.SEEK_END)
    size = file.file.tell()
    file.file.seek(0)

    if size > MAX_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image is too large.",
        )

    # حذف الصورة القديمة
    if current_user.avatar_url:

        old_filename = os.path.basename(current_user.avatar_url)

        old_path = os.path.join(
            UPLOAD_DIR,
            old_filename,
        )

        if os.path.exists(old_path):
            os.remove(old_path)

    extension = os.path.splitext(file.filename)[1]

    filename = f"{uuid.uuid4()}{extension}"

    filepath = os.path.join(
        UPLOAD_DIR,
        filename,
    )

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer,
        )

    # نحفظ رابطاً وليس مساراً
    current_user.avatar_url = f"/uploads/avatars/{filename}"

    db.commit()

    db.refresh(current_user)

    return current_user