from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import register_user, login_user
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(db, user)
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    return login_user(db, user)