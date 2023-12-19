FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
FROM node:18-alpine as final
WORKDIR /app

COPY --from=build /app/.next/standalone .
COPY --from=build /app/.next/static ./.next/static

RUN apk update

USER nobody
CMD ["node", "server.js"]

# build the image
# docker build -t nextts-template .

# run the image
# docker run --rm -d -p 3000:3000 nextts-template