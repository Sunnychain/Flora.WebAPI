FROM node:14-alpine as build-step

WORKDIR /usr/srs/app

COPY package.json yarn.lock /usr/srs/app/
RUN apk add git
RUN git config --global url."git@github.com:org".insteadOf "git://github.com/org"
RUN yarn install --network-timeout 1000000

COPY . /usr/srs/app/
RUN yarn build --network-timeout 1000000

FROM nginx:1.17.1-alpine
COPY --from=build-step /usr/srs/app/build /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx","-g", "daemon off;"]