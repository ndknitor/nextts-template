FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN mkdir "/.npm"
RUN chown -R 65534:65534 "/.npm"
USER nobody
CMD ["npm", "start"]

#build the image
#docker build -t nextts-template .

#run the image
#docker run --rm -d -p 3000:3000 nextts-template
