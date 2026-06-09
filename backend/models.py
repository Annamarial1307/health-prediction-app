from sqlalchemy import Column, Integer, String, Date, Float
from database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    dob = Column(Date)
    email = Column(String, index=True)
    glucose = Column(Float)
    haemoglobin = Column(Float)
    cholesterol = Column(Float)
    remarks = Column(String)
