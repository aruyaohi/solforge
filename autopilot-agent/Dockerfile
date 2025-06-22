# 🐍 Base image with slim size to reduce build weight
FROM python:3.11-slim

# 🧼 Prevent .pyc files; allow pip to cache packages to avoid re-downloading
ENV PYTHONDONTWRITEBYTECODE=1
# ❌ Remove this to enable caching, which speeds up builds!
# ENV PIP_NO_CACHE_DIR=1

# 🔧 Install system dependencies required for scientific packages, Git, etc.
RUN apt-get update && apt-get install -y \
    curl git build-essential libglib2.0-0 libsm6 libxext6 libxrender1 ffmpeg && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 📦 Install Poetry (Python dependency manager)
RUN curl -sSL https://install.python-poetry.org | python3 - && \
    ln -s /root/.local/bin/poetry /usr/local/bin/poetry

# 📁 Set working directory
WORKDIR /app

# 🔁 Copy dependency metadata first to leverage Docker layer caching
COPY pyproject.toml poetry.lock /app/

# ⚙️ Disable Poetry virtualenvs (we're inside a container already)
RUN poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi

# 📄 Now copy the rest of your source code
COPY . /app/

# 🏁 Command to run your self-driving agent
CMD ["poetry", "run", "python", "-m", "src.autopilot.main"]
