# BreaScope AI Backend

FastAPI service that serves the trained PyTorch model and returns malignancy probability estimates.

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Environment variables (optional):

```bash
MODEL_PATH=./model.pt
DROPOUT_RATE=0.2
MC_RUNS=50
ALLOWED_ORIGINS=http://localhost:5173,https://myfrontend.app
```

## Run

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Health Check

```bash
curl http://localhost:8000/health
```

## Prediction Example

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "x.radius_mean": 14.127291739894552,
    "x.texture_mean": 19.289648506151146,
    "x.perimeter_mean": 91.96903339191564,
    "x.area_mean": 654.8891036906855,
    "x.smoothness_mean": 0.09636028119507908,
    "x.compactness_mean": 0.10434098418277679,
    "x.concavity_mean": 0.0887993158172232,
    "x.concave_pts_mean": 0.04891914586994727,
    "x.symmetry_mean": 0.18116186291739894,
    "x.fractal_dim_mean": 0.06279760984182776,
    "x.radius_se": 0.4051720562390158,
    "x.texture_se": 1.2168534270650264,
    "x.perimeter_se": 2.8660592267135323,
    "x.area_se": 40.337079086116,
    "x.smoothness_se": 0.007040978910369069,
    "x.compactness_se": 0.0254781388400703,
    "x.concavity_se": 0.031893716344463974,
    "x.concave_pts_se": 0.011796137082601054,
    "x.symmetry_se": 0.02054229876977153,
    "x.fractal_dim_se": 0.0037949038664323374,
    "x.radius_worst": 16.269189806678384,
    "x.texture_worst": 25.677223198594024,
    "x.perimeter_worst": 107.26121265377856,
    "x.area_worst": 880.5831282952549,
    "x.smoothness_worst": 0.1323685940246046,
    "x.compactness_worst": 0.2542650439367311,
    "x.concavity_worst": 0.27218848330404216,
    "x.concave_pts_worst": 0.11460622319859401,
    "x.symmetry_worst": 0.2900755711775044,
    "x.fractal_dim_worst": 0.08394581722319859
  }'
```
