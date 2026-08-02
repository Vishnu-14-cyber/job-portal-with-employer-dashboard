from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
def register_user(db: Session, user: UserCreate):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        return {"message": "Email already registered"}
    new_user = User(
        username=user.username,
        email=user.email,
        password=user.password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User Registered Successfully"}
def login_user(db: Session, user: UserLogin):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if not existing_user:
        return {"message": "User not found"}
    if existing_user.password != user.password:
        return {"message": "Incorrect password"}
    return {
        "message": "Login Successful",
        "username": existing_user.username
    }