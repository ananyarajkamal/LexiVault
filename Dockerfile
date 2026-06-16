FROM python:3.11-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PORT=7860 \
    HOME=/home/user

# Install system dependencies (like git if needed, and clean up)
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    tesseract-ocr \
    tesseract-ocr-eng \
    tesseract-ocr-hin \
    && rm -rf /var/lib/apt/lists/*

# Set up user with UID 1000 (standard for Hugging Face Spaces)
RUN useradd -m -u 1000 user
WORKDIR $HOME/app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files with correct ownership
COPY --chown=user:user . .

# Set permissions for local data storage directories
RUN mkdir -p data/uploads data/faiss_index && \
    chown -R user:user data

USER user

# Expose Hugging Face default port
EXPOSE 7860

# Run FastAPI app
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
