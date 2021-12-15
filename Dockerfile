FROM node:14-alpine AS deps
WORKDIR /app/floraweb
RUN apk add git
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:14-alpine AS builder
WORKDIR /app/floraweb
COPY . .
COPY --from=deps /app/floraweb/node_modules ./node_modules
RUN yarn build

FROM nginx:1.17.1-alpine
COPY --from=builder /app/floraweb/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx","-g", "daemon off;"]