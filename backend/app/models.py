from datetime import datetime
from sqlalchemy import Column, String, DateTime, Enum
from .database import Base
from .enums import StatusEnum, PriorityEnum
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


class Issue(Base):
    __tablename__ = "issues"

    id = Column( String, primary_key=True, index=True )    
    title = Column( String, nullable=False )
    description = Column( String, nullable=True )
    status= Column( Enum(StatusEnum), nullable=False, default=StatusEnum.open )
    priority = Column( Enum(PriorityEnum), nullable=False )
    date_added = Column( DateTime, nullable=False, default=datetime.utcnow )
    date_completed = Column( DateTime, nullable=True )
    issues = relationship("Issue", back_populates="owner", cascade="all, delete")

class User(Base):
    __tablename__ = "users"

    id = Column( String, primary_key=True, index=True )    
    username = Column( String, unique=True, nullable=False, index=True, )
    email = Column( String, unique=True, nullable=False, index=True )
    hashed_password = Column( String, nullable=False )
    date_created = Column( DateTime, nullable=False, default=datetime.utcnow )
    owner_id = Column(String, ForeignKey("users.id"), nullable=False )
    owner = relationship( "User", back_populates="issues" )
