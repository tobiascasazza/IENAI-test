FROM node:18.18 AS frontend

WORKDIR /app
RUN apt-get update && apt-get install -y python3 python3-venv python3-pip
RUN rm -rf venv && python3 -m venv venv 
RUN ./venv/bin/python --version
RUN ./venv/bin/pip install --upgrade pip setuptools wheel
RUN ./venv/bin/pip install plotly

RUN ls ./venv/bin 
COPY . . 
RUN yarn install

EXPOSE 3000
