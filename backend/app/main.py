from fastapi import FastAPI
from .routers import issues

app = FastAPI(
    title="IssueHub API",
    description="Backend API for managing project issues",
    version="1.0.0"
    )

app.include_router(issues.router)

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
