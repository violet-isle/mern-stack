#  Dockerfile for Node Express Backend

FROM node:21.7.1

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm init -y
RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 5555

CMD ["npm","start"]