FROM node:20 as builder
WORKDIR /frontend
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

RUN yarn run build

# Создаем файл окружения для Docker
RUN echo "NODE_ENV=production" > .env
# RUN echo "NEXT_PUBLIC_API_URL=http://localhost:8000" >> .env
RUN echo "NEXT_PUBLIC_BASE_URL=https://service-industry.ru" >> .env
RUN echo "NEXT_PUBLIC_SITE_URL=https://service-industry.ru" >> .env
RUN echo "ANALYZE=false" >> .env

# Производственная стадия с nginx
FROM node:20
WORKDIR /frontend/

# Disable Next.js telemetry in runtime
ENV NEXT_TELEMETRY_DISABLED=1

# Копируем собранные файлы из builder stage
COPY --from=builder /frontend/.next/ ./.next/
COPY --from=builder /frontend/public/ ./public/
COPY --from=builder /frontend/next.config.ts ./next.config.ts
COPY --from=builder /frontend/node_modules/ ./node_modules/
COPY --from=builder /frontend/package.json ./package.json

CMD ["yarn", "start"]
# Копируем конфигурацию nginx (если есть)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000