import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi_utilities import ttl_lru_cache
from slowapi import Limiter
from slowapi.util import get_remote_address
from google import genai

PROJECT_ID = "poised-octane-449005-q1"
GCLOUD_LOCATION = "us-west1"
DEFAULT_MODEL = "gemini-2.0-flash-001"


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "./credentials.json"
client = genai.Client(
    vertexai=True, project=PROJECT_ID, location=GCLOUD_LOCATION,
)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up the limiter for rate-limiting
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.get("/")
def read_root():
    return {"message": "Welcome to Cloud Print API!"}

@limiter.limit("60/minute")
@ttl_lru_cache(ttl=60, max_size=128)
@app.get("/test")
def read_root(request: Request):
    answer = generate()
    return {"message": answer}

def generate(model=DEFAULT_MODEL):
    response = client.models.generate_content(
    model=model,
    contents=[
        "Give me the skeleton of an app",
    ],
    )
    return response.text

def start_app():
    import uvicorn

    # Get the host and port from environment variables with default values
    host = os.getenv("APP_HOST", "127.0.0.1")  # Use localhost for local dev
    port = int(os.getenv("APP_PORT", 8000))    # Default port 8000 for local dev

    # Start the server
    uvicorn.run(app, host=host, port=port)


if __name__ == "__main__":
    # This runs the app locally when executing `python app.py`
    start_app()