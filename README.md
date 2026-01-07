# 🩺 BreaScope AI — Breast Cancer Risk Estimator

BreaScope AI is an educational web tool that estimates the probability of breast cancer malignancy based on mammographic cell‐nuclei measurements from the **Wisconsin Diagnostic Breast Cancer Dataset**.

This project demonstrates an **end-to-end AI workflow**:

- Data preprocessing & class balancing (Borderline-SMOTE)
- Feature scaling
- Deep Learning classification using **PyTorch CNN**
- Bayesian Monte-Carlo Dropout for uncertainty estimation
- Backend API with **FastAPI + Uvicorn**
- Frontend client built with **Vite + React**
- Fully deployed using **Railway (backend)** and **Vercel (frontend)**

> ⚠️ **Disclaimer:**  
> This tool is strictly for research and educational purposes only.  
> It must **not** be used for clinical diagnosis, screening, or treatment decisions.

---

## 🚀 Live Demo

Frontend  
👉 https://breascope-30m0xm9gr-serhiis-projects-83c40c39.vercel.app/

Backend  
👉 https://breascope-ai-production.up.railway.app/

Health Check  
👉 `/health`

Prediction Endpoint  
👉 `/predict`

---

## 📦 Tech Stack

**Machine Learning**
- PyTorch
- Borderline-SMOTE
- StandardScaler
- Monte-Carlo Dropout

**Backend**
- FastAPI
- Uvicorn
- Joblib
- NumPy

**Frontend**
- React (Vite)
- Axios
- TailwindCSS (if applicable)

**Deployment**
- Railway (Python API)
- Vercel (Frontend)

---

## 🧠 Model Overview

The model is a **Convolutional Neural Network (CNN)** adapted for structured tabular data.  
Input features are reshaped into a `1 × 6 × 5` tensor to allow the CNN to capture spatial feature correlations.

Training Pipeline:
1. Standardise features with `StandardScaler`
2. Apply **Borderline-SMOTE** to oversample malignant samples
3. Train CNN using Cross-Entropy Loss + Adam Optimiser
4. Enable **Dropout during inference** to estimate predictive uncertainty

Performance:
- **Accuracy ≈ 0.97**
- **ROC-AUC ≈ 0.998**
- Excellent recall on malignant class

> Note: Performance is measured on the Wisconsin dataset.  
> Real-world performance will vary.

---

## 🔌 API Usage

### Endpoint
```
POST /predict
```

### Request Body (JSON)
Example benign-leaning sample:
```json
{
  "x.radius_mean": 12.5,
  "x.texture_mean": 17.0,
  "x.perimeter_mean": 80.0,
  "x.area_mean": 480.0,
  "x.smoothness_mean": 0.090,
  "x.compactness_mean": 0.095,
  "x.concavity_mean": 0.060,
  "x.concave_pts_mean": 0.030,
  "x.symmetry_mean": 0.16,
  "x.fractal_dim_mean": 0.060,
  "x.radius_se": 0.30,
  "x.texture_se": 1.0,
  "x.perimeter_se": 2.1,
  "x.area_se": 30.0,
  "x.smoothness_se": 0.005,
  "x.compactness_se": 0.018,
  "x.concavity_se": 0.025,
  "x.concave_pts_se": 0.009,
  "x.symmetry_se": 0.019,
  "x.fractal_dim_se": 0.0028,
  "x.radius_worst": 14.5,
  "x.texture_worst": 22.5,
  "x.perimeter_worst": 95.0,
  "x.area_worst": 700.0,
  "x.smoothness_worst": 0.115,
  "x.compactness_worst": 0.190,
  "x.concavity_worst": 0.200,
  "x.concave_pts_worst": 0.080,
  "x.symmetry_worst": 0.260,
  "x.fractal_dim_worst": 0.080
}
```

### Response
```json
{
  "probability": 0.175,
  "label": "benign"
}
```

---

## 🖥 Local Development

### Backend
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```
cd frontend
npm install
npm run dev
```

---

## ☁ Deployment

### Backend — Railway
- Python buildpack
- Start command:
```
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Frontend — Vercel
- Framework preset: **Vite**
- Set backend API URL in environment config

---

## 🔍 Dataset Source

Wisconsin Diagnostic Breast Cancer Dataset  
https://www.kaggle.com/datasets/utkarshx27/breast-cancer-wisconsin-diagnostic-dataset

---

## 👨‍💻 Author

Built by **Serhii Sotskyi**  
AI Engineer & Computer Science Student

---

## ⚠ Ethical Notice

Medical AI systems require:
- clinical validation
- bias analysis
- calibration
- regulatory approval

This project is not a medical device.

---

## ⭐ Support

If you find this project useful, consider starring the repo!
