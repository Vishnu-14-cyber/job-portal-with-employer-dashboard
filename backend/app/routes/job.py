from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.schemas.job import JobCreate
from app.services.job_service import create_job, get_jobs
router = APIRouter()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.post("/create")
def add_job(job: JobCreate, db: Session = Depends(get_db)):
    return create_job(db, job)
@router.get("/")
def view_jobs(db: Session = Depends(get_db)):
    return get_jobs(db)