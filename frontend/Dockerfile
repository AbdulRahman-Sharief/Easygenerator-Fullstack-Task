# Stage 1 - build
FROM node:22-alpine AS builder
WORKDIR /app


COPY package*.json ./
RUN npm ci


COPY . .

RUN npm run build


FROM node:22-alpine AS runner
WORKDIR /app


RUN addgroup -S nextgroup && adduser -S nextuser -G nextgroup

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/node_modules ./node_modules

RUN chown -R nextuser:nextgroup /app
USER nextuser

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start"]
