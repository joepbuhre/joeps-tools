FROM node:latest as builder

WORKDIR /app

COPY ./ ./

RUN npm i

RUN npm run build

FROM nginx

WORKDIR /app

COPY --from=builder /app/dist/ /app/

COPY ./nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
