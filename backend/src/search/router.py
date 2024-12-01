from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert
from collections import defaultdict
from src.database import get_async_session
from src.models import workers, test


router = APIRouter(
    prefix='/search',
    tags=['search']
)


async def generate_nested_structure(session: AsyncSession):
    # Выполняем запрос для получения всех данных
    query = select(
        workers.c.id,
        workers.c.department_1,
        workers.c.functional_block,
        workers.c.department_2,
        workers.c.department_3,
        workers.c.department_4,
        workers.c.name,
        workers.c.surname,
        workers.c.employment,
        workers.c.job_title,
    )
    result = await session.execute(query)
    rows = result.fetchall()

    # Временное хранилище для группировки данных
    data = defaultdict(lambda: {"name": "", "subDepartments": {}, "workers": []})

    # Проходим по всем строкам и формируем вложенную структуру
    for row in rows:
        # Собираем уровни департаментов в список (игнорируя NULL)
        levels = [row.department_1, row.functional_block, row.department_2, row.department_3, row.department_4]
        levels = [level for level in levels if level]  # Убираем None
        
        current = data

        # Проходим по уровням департаментов, создаем вложенность
        for level in levels:
            if level not in current["subDepartments"]:
                current["subDepartments"][level] = {"name": level, "subDepartments": {}, "workers": []}
            current = current["subDepartments"][level]
        
        # Добавляем сотрудника на текущем уровне вложенности
        worker = {
            "id": row.id,  # Используем pk (id) из базы данных
            "name": row.name,
            "surname": row.surname,
            "flag": row.employment,
            "position": row.job_title,
        }
        current["workers"].append(worker)

    # Преобразуем defaultdict в обычный dict
    def convert_to_dict(d):
        if isinstance(d, defaultdict):
            d = {k: convert_to_dict(v) for k, v in d.items()}
        return d

    return convert_to_dict(data)

# Роут для получения всех данных
@router.get("/")
async def get_nested_workers(session: AsyncSession = Depends(get_async_session)):
    nested_data = await generate_nested_structure(session)
    to_delete = ['name', 'subDepartments', 'workers']
    for delete in to_delete:
        del nested_data['subDepartments'][delete]
    return nested_data


# Роут для поиска пользователя
@router.get('/worker')
async def get_worker():
    ...
