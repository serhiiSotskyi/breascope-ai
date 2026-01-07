export default function Report() {
  return (
    <div className="container mt-4 mb-5">

      <div className="col-lg-10 mx-auto">

        <div className="alert alert-warning small">
          <strong>Educational Use Only —</strong> This technical report is part of a university deep-learning project and must not be used for clinical diagnosis.
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-header bg-white">
            <h3 className="m-0 fw-bold">BreaScope AI — Technical Report</h3>
          </div>

          <div className="card-body p-0">

            <iframe
              src="/report.html"
              title="Technical Report"
              width="100%"
              height="1200px"
              style={{
                border: "none",
                borderBottomLeftRadius: "6px",
                borderBottomRightRadius: "6px",
              }}
            />
          </div>
        </div>

        <footer className="text-center text-muted small mt-4">
          <div>BreaScope AI — created for educational use only.</div>
          <div>
            Researched by{" "}
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
  );
}
