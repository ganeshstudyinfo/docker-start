FROM python:3.8.13-bullseye
ENV PYTHONUNBUFFERED=1
WORKDIR /backend
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000