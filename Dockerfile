FROM node

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src/app.js src/app.js

RUN npm install

ENTRYPOINT [ "node", "src/app.js" ]