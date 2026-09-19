from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.database.database import engine, Base
from app.models.user import User
from app.models.application import Application
from app.models.job import Job
from app.routes.job import router as job_router
Base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(job_router, prefix="/jobs", tags=["Jobs"])

if __name__ == "__main__":
    import uvicorn
    from pathlib import Path
    _dir = Path(__file__).resolve().parent.parent
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000,
        ssl_keyfile=str(_dir / "key.pem"),
        ssl_certfile=str(_dir / "cert.pem"),
    )