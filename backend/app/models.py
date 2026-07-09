from datetime import datetime
from sqlalchemy import Column, String, DateTime, Enum
from .database import Base
from .enums import StatusEnum, PriorityEnum


class Issue(Base):
    __tablename__ = "issues"
    id = Column( String, primary_key=True, index=True )    
    title = Column( String, nullable=False )
    description = Column( String, nullable=True )
    status= Column( Enum(StatusEnum), nullable=False, default=StatusEnum.open )
    priority = Column( Enum(PriorityEnum), nullable=False )
    date_added = Column( DateTime, nullable=False, default=datetime.utcnow )
    date_completed = Column( DateTime, nullable=True )

class User(Base):
    __tablename__ = "users"
    id = Column( String, primary_key=True, index=True )    
    username = Column( String, unique=True, nullable=False, index=True, )
    email = Column( String, unique=True, nullable=False, index=True )
    hashed_password = Column( String, nullable=False )
    date_created = Column( DateTime, nullable=False, default=datetime.utcnow )
