FROM python:3.11-slim AS backend

WORKDIR /app
RUN apt-get update && apt-get install -y python3 python3-venv python3-pip
RUN python3 -m venv venv
RUN ./venv/bin/python --version
RUN ./venv/bin/pip install --upgrade pip setuptools wheel
RUN ./venv/bin/pip install plotly

COPY . .

FROM node:18.18 AS frontend

WORKDIR /app
COPY --from=backend /app .
RUN apt-get update && apt-get install -y python3 python3-venv python3-pip
RUN rm -rf venv && python3 -m venv venv 
RUN ./venv/bin/python --version
RUN ./venv/bin/pip install --upgrade pip setuptools wheel
RUN ./venv/bin/pip install plotly

RUN ls ./venv/bin 
COPY . . 
RUN yarn install

EXPOSE 3000
