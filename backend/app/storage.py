import json
from pathlib import Path

from fastapi.encoders import jsonable_encoder

from .schemas import IssueResponse


DATA_FILE = Path(__file__).parent / "data" / "issues.json"


def load_issues() -> list[IssueResponse]:
    with open(DATA_FILE, "r", encoding="utf-8") as file:
        data = json.load(file)

    return [
        IssueResponse(**issue)
        for issue in data
    ]


def save_issues(issues: list[IssueResponse]) -> None:
    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(
            jsonable_encoder(issues),
            file,
            indent=4,
            ensure_ascii=False,
        )
