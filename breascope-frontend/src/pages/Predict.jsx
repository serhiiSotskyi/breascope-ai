import { useEffect, useMemo, useRef, useState } from "react";

const defaultValues = {
  "x.radius_mean": 14.127,
  "x.texture_mean": 19.290,
  "x.perimeter_mean": 91.969,
  "x.area_mean": 654.889,

  "x.smoothness_mean": 0.096,
  "x.compactness_mean": 0.104,
  "x.concavity_mean": 0.089,
  "x.concave_pts_mean": 0.049,
  "x.symmetry_mean": 0.181,
  "x.fractal_dim_mean": 0.063,

  "x.radius_se": 0.405,
  "x.texture_se": 1.217,
  "x.perimeter_se": 2.866,
  "x.area_se": 40.337,

  "x.smoothness_se": 0.007,
  "x.compactness_se": 0.025,
  "x.concavity_se": 0.032,
  "x.concave_pts_se": 0.012,
  "x.symmetry_se": 0.021,
  "x.fractal_dim_se": 0.004,

  "x.radius_worst": 16.269,
  "x.texture_worst": 25.677,
  "x.perimeter_worst": 107.261,
  "x.area_worst": 880.583,

  "x.smoothness_worst": 0.132,
  "x.compactness_worst": 0.254,
  "x.concavity_worst": 0.272,
  "x.concave_pts_worst": 0.115,
  "x.symmetry_worst": 0.290,
  "x.fractal_dim_worst": 0.084,
};

const simpleKeys = [
  "x.radius_mean",
  "x.texture_mean",
  "x.perimeter_mean",
  "x.area_mean",
  "x.compactness_mean",
];

const presetProfiles = {
  benign: {
    label: "Typical Benign Tumour",
    values: {
      "x.radius_mean": 12.1,
      "x.texture_mean": 17.9,
      "x.perimeter_mean": 78.1,
      "x.area_mean": 462.8,
      "x.smoothness_mean": 0.092,
      "x.compactness_mean": 0.08,
      "x.concavity_mean": 0.046,
      "x.concave_pts_mean": 0.025,
      "x.symmetry_mean": 0.181,
      "x.fractal_dim_mean": 0.062,
      "x.radius_se": 0.28,
      "x.texture_se": 1.21,
      "x.perimeter_se": 2.05,
      "x.area_se": 20.4,
      "x.smoothness_se": 0.006,
      "x.compactness_se": 0.02,
      "x.concavity_se": 0.025,
      "x.concave_pts_se": 0.008,
      "x.symmetry_se": 0.018,
      "x.fractal_dim_se": 0.0034,
      "x.radius_worst": 13.4,
      "x.texture_worst": 25.0,
      "x.perimeter_worst": 87.0,
      "x.area_worst": 535.5,
      "x.smoothness_worst": 0.12,
      "x.compactness_worst": 0.185,
      "x.concavity_worst": 0.19,
      "x.concave_pts_worst": 0.075,
      "x.symmetry_worst": 0.275,
      "x.fractal_dim_worst": 0.08,
    },
  },
  borderline: {
    label: "Borderline / Suspicious Case",
    values: {
      "x.radius_mean": 14.5,
      "x.texture_mean": 19.5,
      "x.perimeter_mean": 96.0,
      "x.area_mean": 680.0,
      "x.smoothness_mean": 0.1,
      "x.compactness_mean": 0.12,
      "x.concavity_mean": 0.1,
      "x.concave_pts_mean": 0.055,
      "x.symmetry_mean": 0.185,
      "x.fractal_dim_mean": 0.063,
      "x.radius_se": 0.4,
      "x.texture_se": 1.3,
      "x.perimeter_se": 2.9,
      "x.area_se": 42.0,
      "x.smoothness_se": 0.0075,
      "x.compactness_se": 0.027,
      "x.concavity_se": 0.032,
      "x.concave_pts_se": 0.012,
      "x.symmetry_se": 0.021,
      "x.fractal_dim_se": 0.0041,
      "x.radius_worst": 16.7,
      "x.texture_worst": 26.5,
      "x.perimeter_worst": 112.0,
      "x.area_worst": 910.0,
      "x.smoothness_worst": 0.135,
      "x.compactness_worst": 0.27,
      "x.concavity_worst": 0.28,
      "x.concave_pts_worst": 0.12,
      "x.symmetry_worst": 0.3,
      "x.fractal_dim_worst": 0.084,
    },
  },
  malignant: {
    label: "Typical Malignant Tumour",
    values: {
      "x.radius_mean": 17.5,
      "x.texture_mean": 21.0,
      "x.perimeter_mean": 115.0,
      "x.area_mean": 990.0,
      "x.smoothness_mean": 0.105,
      "x.compactness_mean": 0.145,
      "x.concavity_mean": 0.16,
      "x.concave_pts_mean": 0.09,
      "x.symmetry_mean": 0.195,
      "x.fractal_dim_mean": 0.065,
      "x.radius_se": 0.55,
      "x.texture_se": 1.6,
      "x.perimeter_se": 3.8,
      "x.area_se": 55.0,
      "x.smoothness_se": 0.009,
      "x.compactness_se": 0.035,
      "x.concavity_se": 0.045,
      "x.concave_pts_se": 0.017,
      "x.symmetry_se": 0.025,
      "x.fractal_dim_se": 0.0052,
      "x.radius_worst": 20.9,
      "x.texture_worst": 29.5,
      "x.perimeter_worst": 146.0,
      "x.area_worst": 1326.0,
      "x.smoothness_worst": 0.16,
      "x.compactness_worst": 0.35,
      "x.concavity_worst": 0.4,
      "x.concave_pts_worst": 0.18,
      "x.symmetry_worst": 0.33,
      "x.fractal_dim_worst": 0.09,
    },
  },
};

const featureKeys = Object.keys(defaultValues);

const toStringMap = (values) =>
  Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, String(value)])
  );

const presetValues = Object.fromEntries(
  Object.entries(presetProfiles).map(([key, profile]) => [
    key,
    profile.values,
  ])
);

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const isValidNumber = (value) =>
  value !== "" && Number.isFinite(Number(value));

const labelForKey = (key) => key.replace("x.", "");

export default function Predict() {
  const [mode, setMode] = useState("simple");
  const [presetKey, setPresetKey] = useState("benign");
  const [values, setValues] = useState(() => toStringMap(defaultValues));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const prevModeRef = useRef(mode);

  useEffect(() => {
    const prevMode = prevModeRef.current;

    if (mode === "presets") {
      setValues(toStringMap(presetValues[presetKey]));
    }

    if (mode === "advanced" && prevMode !== "advanced") {
      setValues(toStringMap(defaultValues));
    }

    if (mode === "simple") {
      setValues((current) => {
        const next =
          prevMode === "presets" ? toStringMap(defaultValues) : { ...current };
        featureKeys.forEach((key) => {
          if (!simpleKeys.includes(key)) {
            next[key] = String(defaultValues[key]);
          }
        });
        return next;
      });
    }

    prevModeRef.current = mode;
  }, [mode, presetKey]);

  const showKeys = mode === "simple" ? simpleKeys : featureKeys;
  const isReadOnly = mode === "presets";

  const isFormValid = useMemo(
    () => featureKeys.every((key) => isValidNumber(values[key] ?? "")),
    [values]
  );

  const handleChange = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
    setError("");
    setResult(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid || loading) {
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const payload = featureKeys.reduce((acc, key) => {
      acc[key] = Number(values[key]);
      return acc;
    }, {});

    try {
      const response = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      // Surface a user-friendly error for any failure state.
      setError("Unable to complete prediction. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const probability = result?.probability;
  const probabilityPercent =
    typeof probability === "number"
      ? `${(probability * 100).toFixed(2)}%`
      : null;
  const riskClass =
    typeof probability === "number" && probability >= 0.7
      ? "text-danger"
      : typeof probability === "number" && probability >= 0.3
      ? "text-warning"
      : "text-success";
  const likelihoodLabel =
    typeof probability === "number" && probability >= 0.5
      ? "Likely Malignant"
      : "Likely Benign";

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <header className="mb-4">
            <h1 className="mb-2">
              BreaScope AI — Breast Cancer Risk Estimator
            </h1>
            <div className="alert alert-light border small mb-0">
              This tool is for research and educational purposes only and must
              not be used for clinical decision-making or treatment decisions.
            </div>
          </header>

          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="d-flex align-items-center justify-content-between">
                  <h2 className="h5 mb-2">Patient Input Mode</h2>
                </div>
                <div className="btn-group w-100" role="group" aria-label="Mode">
                  {[
                    { value: "presets", label: "Quick Presets" },
                    { value: "simple", label: "Simple" },
                    { value: "advanced", label: "Advanced" },
                  ].map((option) => (
                    <span key={option.value}>
                      <input
                        type="radio"
                        className="btn-check"
                        name="mode"
                        id={`mode-${option.value}`}
                        value={option.value}
                        checked={mode === option.value}
                        onChange={() => setMode(option.value)}
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor={`mode-${option.value}`}
                      >
                        {option.label}
                      </label>
                    </span>
                  ))}
                </div>
                <p className="text-muted small mt-2 mb-0">
                  {mode === "presets" &&
                    "Use realistic example profiles to quickly see model behaviour."}
                  {mode === "simple" &&
                    "Enter 5 key measurements — remaining features use dataset averages."}
                  {mode === "advanced" &&
                    "Enter all 30 features for full clinical detail."}
                </p>
              </div>

              {mode === "presets" && (
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Quick Preset Profiles
                  </label>
                  <div className="row g-2">
                    {Object.entries(presetProfiles).map(([key, preset]) => (
                      <div className="col-md-4" key={key}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="preset"
                            id={`preset-${key}`}
                            value={key}
                            checked={presetKey === key}
                            onChange={() => setPresetKey(key)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`preset-${key}`}
                          >
                            {preset.label}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="alert alert-secondary small mt-3 mb-0">
                    These preset profiles are synthetic examples based on the
                    Breast Cancer Wisconsin Diagnostic Dataset. They do not
                    represent clinical outcomes.
                  </div>
                </div>
              )}

              <div className="mb-3">
                <h2 className="h5 mb-2">Enter Measurements</h2>
              </div>

              <div className="row g-3">
                {showKeys.map((key) => {
                  const value = values[key] ?? "";
                  const invalid = !isValidNumber(value);
                  return (
                    <div
                      className={mode === "simple" ? "col-md-6" : "col-md-4"}
                      key={key}
                    >
                      <label className="form-label" htmlFor={key}>
                        {labelForKey(key)}
                      </label>
                      <input
                        id={key}
                        name={key}
                        className={`form-control${invalid ? " is-invalid" : ""}`}
                        type="number"
                        inputMode="decimal"
                        step="any"
                        value={value}
                        readOnly={isReadOnly}
                        onChange={(event) =>
                          handleChange(key, event.target.value)
                        }
                      />
                    </div>
                  );
                })}
              </div>

              {error && (
                <div className="alert alert-danger mt-4 mb-0" role="alert">
                  {error}
                </div>
              )}

              {probabilityPercent && (
                <div className="mt-4">
                  <h2 className="h5 mb-2">Prediction Output</h2>
                  <div className={`fs-4 fw-semibold ${riskClass}`}>
                    Probability: {probabilityPercent}
                  </div>
                  {typeof probability === "number" && (
                    <div className="mt-1 fw-semibold">{likelihoodLabel}</div>
                  )}
                  {typeof probability === "number" && (
                    <div className="mt-3">
                      <div className="fw-semibold mb-1">Risk Probability</div>

                      <div className="progress" style={{ height: "28px" }}>
                        <div
                          className={`progress-bar ${
                            probability > 0.7
                              ? "bg-danger"
                              : probability >= 0.3
                              ? "bg-warning"
                              : "bg-success"
                          }`}
                          role="progressbar"
                          style={{ width: `${probability * 100}%` }}
                          aria-valuenow={probability * 100}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {(probability * 100).toFixed(2)}%
                        </div>
                      </div>

                      <p className="text-muted small mt-2 mb-0">
                        BreaScope is an educational tool only. It does not
                        provide medical advice, diagnosis, or treatment. Always
                        consult a qualified healthcare professional regarding any
                        medical concerns.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="d-grid mt-4">
                <button
                  className="btn btn-primary btn-lg"
                  type="submit"
                  disabled={!isFormValid || loading}
                >
                  {loading ? "Analysing..." : "Predict"}
                </button>
              </div>
            </form>
          </div>

          <footer className="text-center text-muted small mt-4">
            <div>BreaScope AI — created for educational use only.</div>
            <div>
              Website created by{" "}
              <a
                className="text-muted"
                href="https://www.linkedin.com/in/sotskyis/"
                target="_blank"
                rel="noreferrer"
              >
                Serhii Sotskyi
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
