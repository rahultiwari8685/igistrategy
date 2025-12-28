"use client"
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Shop() {

    const [activeCategory, setActiveCategory] = useState("All");
    const categories = ["All", "Political", "Corporate"];

    const reportData = [
        {
            id: 1,
            category: "Political",
            title: "Public Opinion",
            price: "$49",
            image: "https://themazine.com/html/mora-blog/images/shop/shop-1.jpg"
        },
        {
            id: 2,
            category: "Political",
            title: "Ground Reporting",
            price: "Free",
            image: "https://themazine.com/html/mora-blog/images/shop/shop-2.jpg"
        },
        {
            id: 3,
            category: "Political",
            title: "Constituency Analysis",
            price: "Free",
            image: "https://themazine.com/html/mora-blog/images/shop/shop-2.jpg"
        },
        {
            id: 4,
            category: "Political",
            title: "Party Performance",
            price: "Free",
            image: "https://themazine.com/html/mora-blog/images/shop/shop-2.jpg"
        },
        {
            id: 5,
            category: "Corporate",
            title: "Consumer Behavior",
            price: "$79",
            image: "https://themazine.com/html/mora-blog/images/shop/shop-3.jpg"
        },
        {
            id: 6,
            category: "Corporate",
            title: "Product Feedback",
            price: "$59",
            image: "https://themazine.com/html/mora-blog/images/shop/shop-4.jpg"
        },
        {
            id: 7,
            category: "Corporate",
            title: "Market Research",
            price: "$79",
            image: "https://themazine.com/html/mora-blog/images/shop/shop-3.jpg"
        },
        {
            id: 8,
            category: "Corporate",
            title: "Competitor Insights",
            price: "$59",
            image: "https://themazine.com/html/mora-blog/images/shop/shop-4.jpg"
        }
    ];

    const ReportCard = ({ report }) => {
        return (
            <div className="col-md-4 col-sm-6 mb-4">
                <div className="shop_items">
                    <div className="shop_img">
                        <img src={report.image} alt={report.title} />
                    </div>

                    <div className="shop_text">
                        <span className="badge badge-dark mb-2">
                            {report.category}
                        </span>

                        <h5 className="s_heding">{report.title}</h5>
                        {/* <h4>{report.price}</h4> */}

                        <Link href="/register" className="theme_btn">
                            View Report
                        </Link>


                    </div>
                </div>
            </div>
        );
    };



    const filteredReports =
        activeCategory === "All"
            ? reportData
            : reportData.filter(r => r.category === activeCategory);

    return (
        <>
            <Header />

            <section className="shop_with_sidebar">
                <div className="container">

                    <h2 className="mb-4 text-center">Reports Library</h2>


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
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>



                    {/* Reports Grid */}
                    <div className="row">
                        {filteredReports.length ? (
                            filteredReports.map(report => (
                                <ReportCard key={report.id} report={report} />
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