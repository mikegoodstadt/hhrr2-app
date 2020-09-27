# Stage 1
FROM node:14-alpine As builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=builder /usr/src/app/dist/hhrr2-app/ /usr/share/nginx/html