# 🐍 Base image with slim size to reduce build weight
FROM python:3.11-slim

# Prevent .pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# Install OS-level deps
RUN apt-get update && apt-get install -y \
    curl git build-essential libglib2.0-0 libsm6 libxext6 libxrender1 ffmpeg && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 - && \
    ln -s /root/.local/bin/poetry /usr/local/bin/poetry

# Set working directory
WORKDIR /app

# Copy code and deps together BEFORE install
COPY . /app/

# Ensure we disable poetry virtualenvs
RUN poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi

# Entry point
CMD ["poetry", "run", "python", "-m", "src.autopilot.main"]
