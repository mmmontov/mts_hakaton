# Используем Node.js окружение
FROM node:18.16.1

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости с явной пересборкой
RUN npm install && npm rebuild esbuild rollup

# Копируем все файлы проекта
COPY . .

# Указываем порт для React
EXPOSE 5173

# Команда для запуска проекта
CMD ["npm", "run", "dev"]
