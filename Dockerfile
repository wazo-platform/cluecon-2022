FROM node:16.15.1-alpine AS compile-image
COPY ./client /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM python:3.7-slim-buster AS build-image
COPY --from=compile-image /app/dist /server/templates

RUN mkdir /server/static
RUN mv /server/templates/assets /server/static/assets
RUN pip install flask requests tinydb
COPY ./server /server
COPY ./client/src/assets/*.wav /server/static/assets/
WORKDIR /server
EXPOSE 5000


CMD ["flask", "--app", "main",  "run", "--host", "0.0.0.0"]
