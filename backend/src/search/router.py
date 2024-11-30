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

# def get_next_level(target_col, prev_col, check_prev):
#     query = eval(f'select(workers.c.{target_col}).where(workers.c.{prev_col} == "{check_prev}").distinct()')
#     return query

# def compare_row_to_list(answer):
#     # return list(map(lambda x: x[0], answer.all()))
#     return [i[0] for i in answer.all()]

async def generate_nested_structure(session: AsyncSession):
    # Выполняем запрос для получения всех данных
    query = select(
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
            "id": len(current["workers"]) + 1,  # Пример ID, если нет уникального ID
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

# Роут для получения данных
@router.get("/")
async def get_nested_workers(session: AsyncSession = Depends(get_async_session)):
    nested_data = await generate_nested_structure(session)
    return nested_data



# @router.get('/test')
# async def test(session: AsyncSession = Depends(get_async_session)):
#     return generate_nested_structure(session)
    
    

# @router.get('/')
# async def test_route(session: AsyncSession = Depends(get_async_session)):
#     block_example = {
#         "level": None,
#         "name": None,
#         "sub_departments": [],
#         "workers": []
#     }
    
    
#     response = []

#     query = select(workers.c.department_1).distinct()
#     answer = await session.execute(query)
#     result = compare_row_to_list(answer)
    
#     for department_1 in result:
#         department_block = {
#         "level": None,
#         "name": None,
#         "sub_departments": [],
#         "workers": []
#     }
#         department_block["level"] = "department_1"
#         department_block["name"] = department_1
        
#         query = get_next_level('functional_block', 'department_1', department_1)
#         answer = await session.execute(query)
#         result = compare_row_to_list(answer)
        
#         for functional_block in result:
#             if functional_block:
#                 query = select(workers.c.department_2).where(
#                     (workers.c.department_1 == department_1) &
#                     (workers.c.functional_block == functional_block)).distinct()
#                 answer = await session.execute(query)
                
#                 # print(compare_row_to_list(answer))
#                 for department_2 in answer:
#                     if department_2:
#                         ...
                    
                
#             else: # добавляем председателя департамента       
#                 query = select(workers.c.id, 
#                             workers.c.job_title,
#                             workers.c.name,
#                             workers.c.surname,
#                             workers.c.employment).where(
#                                 (workers.c.department_1 == department_1) &
#                                         (workers.c.functional_block == None))
#                 # print(department_block)
#                 answer = await session.execute(query)
#                 answer = answer.all()[0]
#                 # print(answer)
#                 worker = {
#                     "id": answer[0],
#                     "job_title": answer[1],
#                     "name": answer[2],
#                     "surname": answer[3],
#                     "employment": answer[4],
#                 }
#                 # dep_workers = department_block['workers'] 
#                 # dep_workers.append(worker)
#                 department_block['workers'].append(worker)
                
        
#         response.append(department_block)
        
#     return response
        
