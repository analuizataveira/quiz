FROM node:20.11-alpine AS builder
WORKDIR /api
COPY . .
RUN npm install && npm run build

FROM node:20.11-alpine AS production
WORKDIR /api
COPY --from=builder ./api/dist ./dist
COPY package.json .
COPY package-lock.json .
RUN npm install --omit=dev
CMD ["node", "dist/index.js"]