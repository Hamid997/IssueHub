from datetime import datetime

from sqlalchemy import (
    Column,
    String,
    DateTime,
    Enum,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .database import Base
from .enums import StatusEnum, PriorityEnum


class Issue(Base):
    __tablename__ = "issues"

    id = Column(
        String(36),
        primary_key=True,
        index=True,
    )

    title = Column(
        String(50),
        nullable=False,
    )

    description = Column(
        String(1000),
        nullable=True,
    )

    status = Column(
        Enum(StatusEnum),
        nullable=False,
        default=StatusEnum.open,
    )

    priority = Column(
        Enum(PriorityEnum),
        nullable=False,
    )

    date_added = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )

    date_completed = Column(
        DateTime,
        nullable=True,
    )

    owner_id = Column(
        String(36),
        ForeignKey("users.id"),
        nullable=False,
    )

    owner = relationship(
        "User",
        back_populates="issues",
    )


class User(Base):
    __tablename__ = "users"

    id = Column(
        String(36),
        primary_key=True,
        index=True,
    )

    username = Column(
        String(30),
        unique=True,
        nullable=False,
        index=True,
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    hashed_password = Column(
        String(255),
        nullable=False,
    )

    date_created = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )

    issues = relationship(
        "Issue",
        back_populates="owner",
        cascade="all, delete",
    )