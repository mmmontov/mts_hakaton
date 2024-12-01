# Команда picmic 

# участники:
- Завадский Максим(@revolxnx) - ML-специалист
- Мамонтов Михаил (@mmmontov) - Backend-разработчик
- Соловьев Евгений (@zhekich_solovev) - Frontend-разработчик
- Величко Софья (@sofleee) - Дизайнер

# Запуск проекта
## находясь в папке mts_hakaton ввести в терминал комманды
```
docker-compose build
docker-compose up
```

сайт находится по адресу ```http://localhost:5173/```

## Структура проекта

Проект разделен на две основные части:

- **backend** — папка с серверной частью на FastAPI.
  - `src` — исходный код бэкенда.
    - `main.py` — главный файл приложения FastAPI.
    - `database.py` — работа с базой данных.
    - `models.py` — описание моделей данных.
    - `search/` — вспомогательный модуль для реализации поисковых функций.
      - `router.py` — роуты API и реализация логики
    - `my_database.db` — локальная база данных SQLite.
    - `req.txt` — файл с зависимостями для установки через `pip`.
    - `test.json` — тестовые данные.
  - `Dockerfile` — файл для сборки Docker-образа бэкенда.

- **frontend/mts_link** — папка с фронтенд частью на React.
  - `src` — исходный код фронтенда.
    - `App.jsx` — главный компонент приложения.
    - `Card.jsx` — компонент для отображения карточки данных.
    - `Fetch.js` — утилита для работы с запросами к API.
    - `DataFetchingComponent.jsx` — компонент для загрузки данных.
    - `index.css` — стили приложения.
    - `Card.module.scss` — модульные стили для карточек.
    - `main.jsx` — точка входа фронтенда.
    - `sampleData.jsx` — пример данных для тестирования.
  - `public/` — статические файлы.
  - `index.html` — основной HTML-файл приложения.
  - `package.json` — зависимости фронтенда.
  - `vite.config.js` — конфигурация Vite.

## Запуск приложения

### 1. Клонирование репозитория
Склонируйте репозиторий на свой компьютер:
```bash
git clone https://github.com/mmmontov/mts_hakaton.git
```
## Используемые библиотеки

### Фронтенд
Для фронтенда используются следующие библиотеки:
- **react**: ^18.3.1
- **react-dom**: ^18.3.1
- **react-router-dom**: ^7.0.1

### Бэкенд - все они перечислины в файле backend/req.txt 
### чтобы удобно их скачать пропишите:
```pip install -r req.txt```
Используется python 3.11.7

Для бэкенда используются следующие библиотеки и зависимости:
- **aiosqlite**: 0.20.0
- **alembic**: 1.13.3
- **annotated-types**: 0.7.0
- **anyio**: 4.6.2.post1
- **argon2-cffi**: 23.1.0
- **argon2-cffi-bindings**: 21.2.0
- **asyncpg**: 0.30.0
- **bcrypt**: 4.1.2
- **certifi**: 2024.8.30
- **cffi**: 1.17.1
- **click**: 8.1.7
- **colorama**: 0.4.6
- **cryptography**: 43.0.3
- **dnspython**: 2.7.0
- **email-validator**: 2.1.2
- **fastapi**: 0.115.2
- **fastapi-cli**: 0.0.5
- **fastapi-users**: 13.0.0
- **fastapi-users-db-sqlalchemy**: 6.0.1
- **greenlet**: 3.1.1
- **gunicorn**: 23.0.0
- **h11**: 0.14.0
- **httpcore**: 1.0.6
- **httptools**: 0.6.4
- **httpx**: 0.27.2
- **idna**: 3.10
- **itsdangerous**: 2.2.0
- **Jinja2**: 3.1.4
- **makefun**: 1.15.6
- **Mako**: 1.3.5
- **markdown-it-py**: 3.0.0
- **MarkupSafe**: 3.0.2
- **mdurl**: 0.1.2
- **orjson**: 3.10.9
- **packaging**: 24.2
- **pwdlib**: 0.2.0
- **pycparser**: 2.22
- **pydantic**: 2.9.2
- **pydantic-extra-types**: 2.9.0
- **pydantic-settings**: 2.6.0
- **pydantic_core**: 2.23.4
- **Pygments**: 2.18.0
- **PyJWT**: 2.8.0
- **python-dotenv**: 1.0.1
- **python-multipart**: 0.0.9
- **PyYAML**: 6.0.2
- **rich**: 13.9.2
- **shellingham**: 1.5.4
- **sniffio**: 1.3.1
- **SQLAlchemy**: 2.0.36
- **starlette**: 0.40.0
- **typer**: 0.12.5
- **typing-extensions**: 4.12.2
- **ujson**: 5.10.0
- **uvicorn**: 0.32.0
- **watchfiles**: 0.24.0
- **websockets**: 13.1
