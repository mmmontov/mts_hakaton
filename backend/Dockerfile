FROM python:3.11.7

# RUN mkdir /hakaton

WORKDIR /app

COPY req.txt .

RUN pip install -r req.txt

COPY . .

# CMD gunicorn src.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]