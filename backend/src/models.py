from sqlalchemy import MetaData, Integer, String, TIMESTAMP, ForeignKey, Table, Column
import datetime

from src.database import metadata, Base

from sqlalchemy import MetaData,Integer,String, TIMESTAMP, ForeignKey,Table,Column
import datetime


workers = Table(
    'Base_date',
    metadata,
    Column("id", Integer, primary_key=True),
    Column("Подразделение 1", String, nullable=False),
    Column("Функциональный блок", String, nullable=False),
    Column("Подразделение 2", String, nullable=False),
    Column("Подразделение 3",String, nullable=False),
    Column("Подразделение 4", String, nullable=False),
    Column("Должность", String, nullable=False),
    Column("Роль", String, nullable=False),
    Column("Фамилия", String, nullable=False),
    Column("Имя", String, nullable=False),
    Column("Телефон", String, nullable=False),
    Column("Город", String, nullable=False),
    Column("Адрес", String, nullable=False),
    Column("Занятость", String, nullable=False),
    
)

test = Table(
    'test',
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
)

