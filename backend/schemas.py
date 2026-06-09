from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import date

class PatientBase(BaseModel):
    full_name: str
    dob: date
    email: EmailStr
    glucose: float = Field(..., description="Must be numeric")
    haemoglobin: float = Field(..., description="Must be numeric")
    cholesterol: float = Field(..., description="Must be numeric")

    @field_validator('dob')
    def dob_must_not_be_future(cls, v):
        if v > date.today():
            raise ValueError('Date of birth cannot be a future date')
        return v

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    pass

class Patient(PatientBase):
    id: int
    remarks: str | None = None

    class Config:
        from_attributes = True
