from pydantic import BaseModel
class ApplicationCreate(BaseModel):
    applicant_name: str
    email: str
    phone: str
