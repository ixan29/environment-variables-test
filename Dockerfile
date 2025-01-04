FROM node:latest
EXPOSE 8000
WORKDIR /app
ADD . /app
RUN npm install
RUN npm run build
CMD ["npm", "start"]
