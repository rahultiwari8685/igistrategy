"use client";

import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import PollContainer from "./components/poll/PollContainer";
import YouTubeLive from "./components/YouTubeLive";
import setting from "../setting.json";
import Footer from "./components/Footer";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.WOW) {
        try {
          new window.WOW().init();
        } catch (e) {
          console.warn("WOW init failed", e);
        }
      }
    }
  }, []);

  const [blogs, setBlogs] = useState([]);
  const featureBlogs = blogs.slice(0, 3);

  const fashionBlogs = blogs.filter((b) => b.videoType !== "1").slice(0, 4);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000); // 1 second delay (optional)

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch(setting.api + "/api/blogs/getAllBlog", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer " + JSON.parse(secureLocalStorage.getItem("logininfo")).token,
      },
    })
      .then((res) => res.json())
      .then((u) => {
        if (u.status === false) {
          // navigate("/login");
        } else {
          setBlogs(u.data);
        }
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  const getYoutubeId = (url) => {
    try {
      const u = new URL(url);
      return u.searchParams.get("v");
    } catch (error) {
      return null;
    }
  };

  const textBlogs = blogs.filter((item) => {
    return !item.youtubeUrl && item.videoType !== "1" && item.videoType !== 1;
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "political", "corporate"];

  const loadReports = async () => {
    try {
      const res = await fetch(setting.api + "/api/reports/getAllReport", {
        method: "GET",
      });
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

  const getPdfUrl = (path) => {
    if (!path) return null;
    return setting.api + "/" + path.replace(/\\/g, "/");
  };

  const filteredReports =
    activeCategory === "All"
      ? reports
      : reports.filter(
          (r) => r.report_type?.toLowerCase() === activeCategory.toLowerCase(),
        );

  const ReportCard = ({ report }) => {
    const pdfUrl = getPdfUrl(report.preview_pdf);

    const previewUrl = pdfUrl
      ? `https://docs.google.com/gview?url=${pdfUrl}&embedded=true`
      : null;

    return (
      <div className="col-md-6 mb-4">
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
          {/* Preview Section */}
          <div className="relative h-[250px] overflow-hidden group">
            {previewUrl ? (
              <iframe
                src={previewUrl}
                title={report.title}
                className="w-full h-full border-0 pointer-events-none blur-[1.5px]"
              />
            ) : (
              <img
                src="https://img.icons8.com/color/480/pdf.png"
                alt="pdf"
                className="w-full h-full object-contain"
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
              <Link
                href={`/report-details/${report._id}`}
                className="bg-white text-black text-sm px-4 py-1 rounded-full hover:bg-gray-200 transition"
              >
                Preview
              </Link>

              <Link
                href={`/report-details/${report._id}`}
                className="bg-black text-white text-sm px-4 py-1 rounded-full border border-white hover:bg-gray-900 transition"
              >
                Buy Report
              </Link>
            </div>

            {/* Tag */}
            <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
              {report.report_type || "Report"}
            </span>
          </div>

          {/* Content */}
          <div className="p-4">
            <h5 className="text-sm font-semibold line-clamp-2">
              {report.title}
            </h5>

            {/* Optional meta */}
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <span>Premium Report</span>
              <span>PDF</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />

      <div className="container">
        <div className="braking_news row">
          <h4 className="braking_heding col-1">IGI</h4>
          <div
            id="newsIndicators"
            className="carousel slide col-11"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item">
                <a href="#">Public Opinion</a>
              </div>
              <div className="carousel-item active carousel-item-left">
                <a href="#">Ground Reporting</a>
              </div>
              <div className="carousel-item carousel-item-next carousel-item-left">
                <a href="#">Constituency Analysis</a>
              </div>
            </div>
            <ol className="carousel-indicators">
              <li
                data-target="#newsIndicators"
                data-slide-to="0"
                className=""
              ></li>
              <li
                data-target="#newsIndicators"
                data-slide-to="1"
                className=""
              ></li>
              <li
                data-target="#newsIndicators"
                data-slide-to="2"
                className="active"
              ></li>
            </ol>
          </div>
        </div>
      </div>

      {/* Home Banner Area */}
      <section className="home_banner_area">
        <div className="container">
          <div className="row home_banner_inner">
            <div
              className="carousel slide banner_slider col-12"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item">
                  <img
                    src="images/slider_1.png"
                    alt="First slide"
                    style={{ opacity: 1 }}
                  />
                </div>
                <div className="carousel-item active">
                  <img
                    src="images/slider_2.png"
                    alt="Second slide"
                    style={{ opacity: 1 }}
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href=".banner_slider"
                data-slide="prev"
              >
                <i className="fa fa-angle-left" />
              </a>
              <a
                className="carousel-control-next"
                href=".banner_slider"
                data-slide="next"
              >
                <i className="fa fa-angle-right" />
              </a>
            </div>

            {/* <ul className="row magazine">
              <li className="col-md-3 col-lg-4 col-sm-6">
                <a href="/news-details">Political Research</a>
              </li>
              <li className="col-md-3  col-lg-4 col-sm-6">
                <a href="/news-details">Ground Reporting</a>
              </li>
              <li className="col-md-3  col-lg-4 col-sm-6">
                <a href="/news-details">Corporate Research</a>
              </li>
              <li className="col-md-3  col-lg-4 col-sm-6">
                <a href="/news-details">Market Research</a>
              </li>
            </ul> */}
          </div>
        </div>
      </section>

      <section className="post_section">
        <div className="container">
          <div className="row post_section_inner">
            <div className="col-lg-8 left_sidebar">
              <div className="row tranding_post_area">
                <div className="col-12 tranding_tittle">
                  <h2>Reports</h2>
                  <a href="/blog">
                    View More <i className="fa fa-arrow-right" />
                  </a>
                </div>

                {loading ? (
                  <p className="text-center w-100">Loading reports...</p>
                ) : filteredReports.length > 0 ? (
                  filteredReports.slice(0, 4).map((report) => (
                    <div className="col-md-6" key={report._id}>
                      <ReportCard report={report} />
                    </div>
                  ))
                ) : (
                  <p className="text-center w-100">
                    No reports found in this category.
                  </p>
                )}
              </div>

              {/* <div className="row feature_post_area">
                <div className="col-12">
                  <div className="feature_tittle">
                    <h2>Report</h2>
                    <a href="/blog">
                      View More <i className="fa fa-arrow-right" />
                    </a>
                  </div>
                </div>

              
                {blogs
                  .filter((item) => item.videoType !== "1")
                  .slice(0, 3)
                  .map((item, index) => (
                    <div className="col-12" key={item._id}>
                      <div
                        className={`media feature_post ${index === 2 ? "border-0" : ""}`}
                      >
                        <div className="feture_img">
                          <a href={`/blog-details/${item.slug}`}>
                        
                            <img
                              src={
                                item.thumbnail
                                  ? `${setting.api}/uploads/images/${item.thumbnail}`
                                  : "https://via.placeholder.com/400x300?text=No+Image"
                              }
                              alt={item.title}
                            />
                          </a>

                          <ul className="special_share">
                            <li>
                              <a href="#">
                                <i className="fa fa-twitter" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fa fa-facebook" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fa fa-google-plus" />
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div className="media-body feture_content">
                          <a
                            href={`/blog-details/${item.slug}`}
                            className="f_heding"
                          >
                            {item.title}
                          </a>

                          <h6>
                            {new Date(item.createdAt).toDateString()}
                            <span>|</span>
                            <a href="#">Admin</a>
                          </h6>

                          <p>{item.subtitle || "No description available"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div> */}

              <div className="row watch_it_area">
                <div className="col-12">
                  <div className="feature_tittle">
                    <br /> <br />
                    <h2>Public Opinion</h2>
                    <a href="/blog">
                      View More <i className="fa fa-arrow-right" />
                    </a>
                  </div>
                </div>

                {/* Filter Only Video Blogs */}
                {blogs
                  .filter((b) => b.videoType === "1")
                  .slice(0, 4)
                  .map((item) => {
                    const videoId = getYoutubeId(item.youtubeUrl);
                    const youtubeThumb = videoId
                      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                      : null;

                    const thumb = item.thumbnail
                      ? `${setting.api}/uploads/images/${item.thumbnail}`
                      : youtubeThumb ||
                        "https://via.placeholder.com/600x400?text=No+Image";

                    return (
                      <div className="col-md-6" key={item._id}>
                        <div className="watch_video">
                          <a
                            href={`/blog-details/${item.slug}`}
                            className="video_thumbnail"
                          >
                            <img src={thumb} alt={item.title} />

                            <span className="play_btn">
                              <i className="flaticon-play-button"></i>
                            </span>
                          </a>

                          <a
                            href={`/blog-details/${item.slug}`}
                            className="video_heding"
                          >
                            {item.title}
                          </a>
                        </div>
                      </div>
                    );
                  })}

                {/* Next 2 as text posts */}
                {blogs
                  .filter((b) => b.videoType === "1")
                  .slice(4, 6)
                  .map((item) => (
                    <div className="col-md-6" key={item._id}>
                      <div className="tranding_post wathc_text">
                        <a
                          href={`/blog-details/${item.slug}`}
                          className="t_heding"
                        >
                          {item.title}
                        </a>
                        <h6>
                          <span className="tag_btn">
                            {item.categories?.[0]?.name ?? "General"}
                          </span>{" "}
                          {new Date(item.createdAt).toDateString()}
                        </h6>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Fashion posts */}
              <div className="row tranding_post_area fashion_post">
                <div className="col-12">
                  <div className="feature_tittle">
                    <h2>Analysis</h2>
                    <a href="/blog">
                      View More <i className="fa fa-arrow-right" />
                    </a>
                  </div>
                </div>

                {fashionBlogs.slice(0, 4).map((item) => (
                  <div className="col-md-6" key={item._id}>
                    <div className="tranding_post">
                      <a
                        href={`/blog-details/${item.slug}`}
                        className="post_img"
                      >
                        <img
                          src={
                            item.thumbnail
                              ? `${setting.api}/uploads/images/${item.thumbnail}`
                              : "https://via.placeholder.com/400x300?text=No+Image"
                          }
                          alt={item.title}
                        />

                        <span className="tag_btn">
                          {item.categories?.[0]?.name ?? "Fashion"}
                        </span>
                      </a>

                      <div className="post_content">
                        <a
                          href={`/blog-details/${item.slug}`}
                          className="t_heding"
                        >
                          {item.title}
                        </a>

                        <h6>
                          {new Date(item.createdAt).toDateString()}
                          <span>|</span>
                          <a href="#">By Admin</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right sidebar */}
            <div className="col-lg-4 right_sidebar">
              <PollContainer />
              {/* <YouTubeLive /> */}

              <div className="latest_news_widget">
                <h2>Trending Reports</h2>

                {blogs
                  .filter((item) => item.videoType !== "1") // ONLY TEXT BLOGS
                  .slice(0, 3)
                  .map((item, index) => {
                    const imgSrc = item.thumbnail
                      ? `${setting.api}/uploads/images/${item.thumbnail}`
                      : "https://via.placeholder.com/300x200?text=No+Image";

                    return (
                      <div
                        className={`widget ${index === 2 ? "border-0" : ""}`}
                        key={item._id}
                      >
                        <a href={`/blog-details/${item.slug}`}>
                          <img src={imgSrc} alt={item.title} />
                        </a>

                        <a
                          href={`/blog-details/${item.slug}`}
                          className="w_heding"
                        >
                          {item.title}
                        </a>
                      </div>
                    );
                  })}

                <a href="/blog" className="load_more_btn">
                  Load more..
                </a>
              </div>

              {/* <div className="video_widget">
                  <h2>Trending Reports</h2>
                {blogs
                  .filter((item) => item.videoType === "1") // ONLY VIDEO BLOGS
                  .slice(0, 3) // SHOW 3 VIDEOS
                  .map((video) => {
                    const id = getYoutubeId(video.youtubeUrl);

                    const thumbnail = id
                      ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
                      : video.thumbnail
                        ? `${setting.api}/uploads/images/${video.thumbnail}`
                        : "https://via.placeholder.com/400x250?text=No+Video";

                    return (
                      <div className="watch_video" key={video._id}>
                        <a
                          href={`/blog-details/${video.slug}`}
                          className="video_thumbnail"
                        >
                          <img src={thumbnail} alt={video.title} />

                          <span className="play_btn">
                            <i className="flaticon-play-button"></i>
                          </span>
                        </a>

                        <a
                          href={`/blog-details/${video.slug}`}
                          className="video_heding"
                        >
                          {video.title}
                        </a>
                      </div>
                    );
                  })}
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="connect_with_us">
        <div className="container">
          <h2>Connect with us</h2>
          <ul className="contact_with_socail">
            <li>
              <a href="#">
                <i className="fa fa-google-plus" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-linkedin" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-instagram" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-twitter" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-youtube" />
              </a>
            </li>
          </ul>
        </div>
      </section>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              ×
            </button>

            <h2>IGI Bengal Assembly Exit Poll 2026</h2>
            <p>Welcome! Check latest Bengal Election Insights.</p>

            <img
              src="/images/slider_1.png" // your generated image
              alt="Exit Poll"
              style={{ width: "100%", borderRadius: "10px" }}
            />

            <a href="/report" className="btn btn-primary mt-3">
              View Details
            </a>
          </div>
        </div>
      )}

      <Footer />

      {/* Scroll Top Button */}
      <button className="scroll-top">
        <i className="fa fa-angle-double-up" />
      </button>

      {/* Preloader */}
      <div className="preloader" style={{ display: "none" }} />

      {/* Scripts - load in order */}
      <Script src="/js/jquery-3.3.1.min.js" strategy="beforeInteractive" />
      <Script src="/js/popper.min.js" strategy="afterInteractive" />
      <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/js/wow.min.js" strategy="afterInteractive" />
      <Script src="/js/theme.js" strategy="afterInteractive" />
    </>
  );
}
