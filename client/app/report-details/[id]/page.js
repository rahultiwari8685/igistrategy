"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import setting from "../../../setting.json";

export default function ShopDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadReport = async () => {
    try {
      const res = await fetch(setting.api + `/api/reports/getReportById/${id}`);
      const data = await res.json();

      if (!data?.status) {
        router.push("/shop");
        return;
      }

      setReport(data.data);
    } catch (error) {
      console.error("Failed to load report", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadReport();
  }, [id]);

  const getPdfUrl = (path) => {
    if (!path) return null;
    return setting.api + "/" + path.replace(/\\/g, "/");
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container text-center py-5">
          <h4>Loading report...</h4>
        </div>
        <Footer />
      </>
    );
  }

  if (!report) return null;

  return (
    <>
      <Header />

      <section className="shop_with_sidebar">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 shop_right_sidebar">
              <div className="s_widget">
                <h4>Report Filters</h4>

                <div className="mb-3">
                  <label>Select State</label>
                  <input
                    className="form-control"
                    value={report.state}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label>Constituency</label>
                  <input
                    className="form-control"
                    value={report.constituency || "N/A"}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-9 shop_left_sidebar">
              <div className="row">
                <div className="col-md-6 min_img">
                  {report.preview_pdf ? (
                    <iframe
                      src={getPdfUrl(report.preview_pdf)}
                      title={report.title}
                      width="100%"
                      height="420"
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/500x420?text=No+Preview"
                      alt={report.title}
                    />
                  )}
                </div>

                <div className="col-md-6 product_details">
                  <h2>{report.title}</h2>
                  <h4>Category: {report.report_type}</h4>

                  <ul className="rating">
                    <li>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star-half-o"></i>
                    </li>
                  </ul>

                  <p>{report.overview}</p>

                  <ul className="value-section">
                    <li>
                      <a href="/pricing" className="theme_btn">
                        Subscribe to Unlock Full Report
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="review-tab col-12 mt-4">
                  <ul className="nav nav-tabs">
                    <li>
                      <a className="active theme_btn">Description</a>
                    </li>
                    <li>
                      <a className="theme_btn">Additional Info</a>
                    </li>
                  </ul>

                  <div className="tab-content mt-3">
                    <p>{report.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="connect_with_us">
        <div className="container text-center">
          <h2>Connect with us</h2>
          <ul className="contact_with_socail">
            <li>
              <a href="#">
                <i className="fa fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-youtube"></i>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
