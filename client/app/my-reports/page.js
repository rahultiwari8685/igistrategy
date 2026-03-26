"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import setting from "../../setting.json";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logininfo = JSON.parse(localStorage.getItem("logininfo"));

    fetch(`${setting.api}/api/customers/my-reports`, {
      headers: {
        Authorization: `Bearer ${logininfo.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setReports(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />

      <div className="container py-5">
        <h2>My Reports</h2>

        {loading ? (
          <p>Loading...</p>
        ) : reports.length === 0 ? (
          <p>No reports accessed yet.</p>
        ) : (
          <div className="row">
            {reports.map((r) => (
              <div key={r.id} className="col-md-4 mb-4">
                <div className="card p-3">
                  <h5>{r.title}</h5>
                  <p>{r.report_type}</p>
                  <p>Plan: {r.plan}</p>

                  <a
                    href={setting.api + "/" + r.full_pdf}
                    target="_blank"
                    className="btn btn-primary btn-sm"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
