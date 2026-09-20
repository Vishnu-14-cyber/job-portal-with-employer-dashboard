from pydantic import BaseModel
class UserCreate(BaseModel):
    company_name: str
    username: str = ""
    email: str
    password: str
    role: str = "employer"
class UserLogin(BaseModel):
    email: str
    password: str