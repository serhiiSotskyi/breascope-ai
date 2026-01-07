import os
import joblib
import numpy as np
import torch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import RootModel

from model import load_model

MODEL_PATH = os.getenv("MODEL_PATH", "model.pt")
DROPOUT = float(os.getenv("DROPOUT_RATE", "0.2"))

model = load_model(MODEL_PATH)
try:
    scaler = joblib.load("scaler.joblib")
except FileNotFoundError as exc:
    raise RuntimeError("Scaler file not found: scaler.joblib") from exc

app = FastAPI(title="BreaScope API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FEATURE_KEYS = [
    "x.radius_mean","x.texture_mean","x.perimeter_mean","x.area_mean",
    "x.smoothness_mean","x.compactness_mean","x.concavity_mean",
    "x.concave_pts_mean","x.symmetry_mean","x.fractal_dim_mean",
    "x.radius_se","x.texture_se","x.perimeter_se","x.area_se",
    "x.smoothness_se","x.compactness_se","x.concavity_se",
    "x.concave_pts_se","x.symmetry_se","x.fractal_dim_se",
    "x.radius_worst","x.texture_worst","x.perimeter_worst","x.area_worst",
    "x.smoothness_worst","x.compactness_worst","x.concavity_worst",
    "x.concave_pts_worst","x.symmetry_worst","x.fractal_dim_worst"
]


class PredictRequest(RootModel[dict]):
    pass


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
def predict(data: PredictRequest):
    payload = data.root   # <-- v2 API

    x = np.array([payload[k] for k in FEATURE_KEYS], dtype=np.float32).reshape(1, -1)

    x_scaled = scaler.transform(x)

    x_tensor = torch.tensor(x_scaled)

    with torch.no_grad():
        logits = model(x_tensor)
        probs = torch.softmax(logits, dim=1)

        malignant_prob = float(probs[0, 1])

    return {
        "probability": malignant_prob,
        "label": "malignant" if malignant_prob >= 0.5 else "benign"
    }