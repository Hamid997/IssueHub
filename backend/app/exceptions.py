from fastapi import HTTPException, status

def issue_not_found():
    return HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Issue not found",
    )