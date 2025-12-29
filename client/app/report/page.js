"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import setting from "../../setting.json";

export default function Report() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = ["All", "political", "corporate"];

    /* ------------------ FETCH REPORTS ------------------ */
    const loadReports = async () => {
        try {
            const res = await fetch(
                setting.api + "/api/reports/getAllReport",
                {
                    method: "GET",
                }
            );
            const data = await res.json();
            if (data.status) {
                setReports(data.data);
            }
        } catch (err) {
            console.error("Failed to load reports", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReports();
    }, []);

    /* ------------------ PDF URL HELPER ------------------ */
    const getPdfUrl = (path) => {
        if (!path) return null;
        return setting.api + "/" + path.replace(/\\/g, "/");
    };

    /* ------------------ FILTER ------------------ */
    const filteredReports =
        activeCategory === "All"
            ? reports
            : reports.filter(
                (r) =>
                    r.report_type?.toLowerCase() === activeCategory.toLowerCase()
            );

    /* ------------------ REPORT CARD ------------------ */
    const ReportCard = ({ report }) => {
        const pdfUrl = getPdfUrl(report.preview_pdf);

        return (
            <div className="col-md-4 col-sm-6 mb-4">
                <div className="shop_items">

                    {/* PDF Preview */}
                    <div className="shop_img">
                        {pdfUrl ? (
                            <iframe
                                src={pdfUrl}
                                title={report.title}
                                width="100%"
                                height="220"
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                }}
                            />
                        ) : (
                            <img
                                src="https://via.placeholder.com/400x220?text=No+Preview"
                                alt={report.title}
                            />
                        )}
                    </div>

                    <div className="shop_text">
                        <span className="badge badge-dark mb-2">
                            {report.report_type}
                        </span>

                        <h5 className="s_heding">{report.title}</h5>

                        <Link
                            href={`/report-details/${report._id}`}
                            className="theme_btn"
                        >
                            View Report
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Header />

            <section className="shop_with_sidebar">
                <div className="container">

                    <h2 className="mb-4 text-center">Reports Library</h2>

                    {/* CATEGORY FILTER */}
                    <div className="text-center mb-5">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    margin: "0 8px",
                                    padding: "10px 18px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                    cursor: "pointer",
                                    backgroundColor:
                                        activeCategory === cat ? "#007bff" : "#f2f2f2",
                                    color:
                                        activeCategory === cat ? "#ffffff" : "#333333",
                                    textTransform: "capitalize",
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* REPORT GRID */}
                    <div className="row">
                        {loading ? (
                            <p className="text-center w-100">Loading reports...</p>
                        ) : filteredReports.length > 0 ? (
                            filteredReports.map((report) => (
                                <ReportCard key={report._id} report={report} />
                            ))
                        ) : (
                            <p className="text-center w-100">
                                No reports found in this category.
                            </p>
                        )}
                    </div>

                </div>
            </section>

            <section className="connect_with_us">
                <div className="container text-center">
                    <h2>Connect with us</h2>
                    <ul className="contact_with_socail">
                        <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                        <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                    </ul>
                </div>
            </section>

            <Footer />
        </>
    );
}
