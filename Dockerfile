### STAGE 1: Build ###
FROM node:12.16.1-alpine As builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:prd

### STAGE 2: Run ###
FROM nginx:1.15.8-alpine
WORKDIR /usr/share/
COPY --from=builder /usr/src/app/dist/apps/recruit-supplier/ /usr/share/nginx/html
EXPOSE 80 80
