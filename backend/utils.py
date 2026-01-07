import torch
import numpy as np

FEATURE_KEYS = [
    "x.radius_mean",
    "x.texture_mean",
    "x.perimeter_mean",
    "x.area_mean",
    "x.smoothness_mean",
    "x.compactness_mean",
    "x.concavity_mean",
    "x.concave_pts_mean",
    "x.symmetry_mean",
    "x.fractal_dim_mean",
    "x.radius_se",
    "x.texture_se",
    "x.perimeter_se",
    "x.area_se",
    "x.smoothness_se",
    "x.compactness_se",
    "x.concavity_se",
    "x.concave_pts_se",
    "x.symmetry_se",
    "x.fractal_dim_se",
    "x.radius_worst",
    "x.texture_worst",
    "x.perimeter_worst",
    "x.area_worst",
    "x.smoothness_worst",
    "x.compactness_worst",
    "x.concavity_worst",
    "x.concave_pts_worst",
    "x.symmetry_worst",
    "x.fractal_dim_worst",
]


def predict_proba(model, tensor, runs: int = 1):
    preds = []

    for _ in range(max(runs, 1)):
        if runs > 1:
            model.train()  # enable MC dropout
        else:
            model.eval()

        with torch.no_grad():
            preds.append(float(model(tensor).item()))

    return float(np.mean(preds))


def get_env(name: str, default=None):
    import os
    return os.getenv(name, default)


def parse_allowed_origins(raw: str):
    return [x.strip() for x in raw.split(",") if x.strip()]