FROM node:14-alpine AS build-step

WORKDIR /usr/srs/app/floraweb

COPY package.json /usr/srs/app/floraweb
RUN apk add --no-cache git
RUN npm install

COPY . /usr/srs/app/floraweb
RUN npm run build

FROM nginx:1.17.1-alpine
COPY --from=build-step /usr/srs/app/floraweb/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx","-g", "daemon off;"]