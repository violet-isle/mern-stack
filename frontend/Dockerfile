# Dockerfile for React client

# Build react client
FROM node:21.7.1 

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm init -y

RUN npm install

# copy local files to app folder
COPY . .


RUN npm run build

EXPOSE 5173

CMD ["npm","run", "preview"]