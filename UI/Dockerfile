# 🚀 Use official Node.js image
FROM node:18-alpine AS builder

# 📁 Set working directory
WORKDIR /app

# 🧱 Copy package.json and install dependencies first for layer caching
COPY package.json package-lock.json* ./
RUN npm install

# 📦 Copy rest of the app
COPY . .

# ⚙️ Build the Next.js application
RUN npm run build

# ---- Production image ----
FROM node:18-alpine AS runner

WORKDIR /app

# 👕 Only copy necessary files from the build stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# 🏁 Start the Next.js server
EXPOSE 3000
CMD ["npm", "start"]
