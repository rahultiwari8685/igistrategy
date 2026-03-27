"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import setting from "../../setting.json";

export default function MyReports() {
  const router = useRouter();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchReports = async () => {
      const logininfo = JSON.parse(localStorage.getItem("logininfo"));

      if (!logininfo?.token) {
        setLoading(false);
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`${setting.api}/api/customers/my-reports`, {
          headers: {
            Authorization: `Bearer ${logininfo.token}`,
          },
          signal: controller.signal,
        });

        const data = await res.json();

        if (data.success) {
          setReports(data.data || []);
        } else {
          console.error("Failed to fetch reports");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReports();

    return () => controller.abort();
  }, [router]);

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
                  <h5>{r?.title || "Untitled"}</h5>
                  <p>{r?.report_type || "-"}</p>
                  <p>Plan: {r?.plan || "-"}</p>

                  <a
                    href={`${setting.api}/${r.full_pdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
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
