FROM node:current-alpine3.16
WORKDIR /app
COPY . /app
RUN npm install
#COPY . /app
CMD ["npm","start"]

