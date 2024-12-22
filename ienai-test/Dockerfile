FROM node:18 as frontend

WORKDIR /app

COPY . .

COPY .env .env

RUN yarn install
RUN yarn build

FROM python:3.9 as backend

WORKDIR /app

COPY . .

RUN python -m venv /venv
RUN /venv/bin/pip install --no-cache-dir -r requirements.txt