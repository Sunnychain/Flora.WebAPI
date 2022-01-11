FROM node:14.18.1 as build-step

WORKDIR /usr/srs/app

COPY package*.json /usr/srs/app
RUN ls
#RUN npm install -g npm@8.3.0
RUN npm install

COPY . /usr/srs/app
RUN npm run build

FROM nginx:1.17.1-alpine
COPY --from=build-step /usr/srs/app/build /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD [ "nginx","-s","daemon off" ]