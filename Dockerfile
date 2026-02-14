FROM node:24-alpine

# Author
LABEL maintainer="Akif Mohammed akiif.dev@gmail.com"

# Create app directory
WORKDIR /app

COPY package.json yarn.lock /app/

# Install app dependencies
RUN yarn

# Bundle app source
COPY . .

ENV NODE_ENV=production

EXPOSE 8868

CMD ["npm", "start"]