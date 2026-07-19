from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from fastapi.staticfiles import StaticFiles

from .routers import issues, users
from .database import Base, engine

from . import models

app = FastAPI(
    title="IssueHub API",
    description="Backend API for managing project issues",
    version="1.0.0"
    )

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(issues.router)
app.include_router(users.router)

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
