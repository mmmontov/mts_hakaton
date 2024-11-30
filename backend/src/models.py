from sqlalchemy import MetaData, Integer, String, TIMESTAMP, ForeignKey, Table, Column
import datetime

from src.database import metadata, Base

from sqlalchemy import MetaData,Integer,String, TIMESTAMP, ForeignKey,Table,Column
import datetime


workers = Table(
    'Base_date',
    metadata,
    Column("id", Integer, primary_key=True),
    Column("department_1", String, nullable=False),
    Column("functional_block", String, nullable=False),
    Column("department_2", String, nullable=False),
    Column("department_3",String, nullable=False),
    Column("department_4", String, nullable=False),
    Column("job_title", String, nullable=False),
    Column("role", String, nullable=False),
    Column("surname", String, nullable=False),
    Column("name", String, nullable=False),
    Column("phone", String, nullable=False),
    Column("city", String, nullable=False),
    Column("address", String, nullable=False),
    Column("employment", String, nullable=False),
    
)

test = Table(
    'test',
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
)

