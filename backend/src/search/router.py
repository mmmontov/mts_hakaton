from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert

from src.database import get_async_session
from src.models import workers, test


router = APIRouter(
    prefix='/search',
    tags=['search']
)

async def get_unique_values(session):
    query = select(test.Подразделение1).distinct()

    # Выполняем запрос
    result = await session.execute(query)

    # Извлекаем уникальные элементы в список
    unique_elements = [row[0] for row in result.fetchall()]
    return unique_elements


@router.get('/')
async def test_route(session: AsyncSession = Depends(get_async_session)):

    query = select(workers.c.id).distinct()
    result = await session.execute(query)

    return result.mappings().all()
    
