FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:20-alpine as final
RUN apk update && apk upgrade
WORKDIR /app

COPY --from=build /app/.next/standalone .
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000

USER nobody
CMD ["node", "server.js"]

# build the image
# docker build -t nextts-template .

# run the image
# docker run --rm -d -p 3000:3000 nextts-template