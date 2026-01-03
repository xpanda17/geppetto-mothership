FROM node:24-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Set a default if one isn't provided
ENV PORT=3000

# We use the ENV variable here
EXPOSE ${PORT}

CMD [ "npm", "start" ]