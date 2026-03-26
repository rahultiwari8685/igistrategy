"use client";

import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import PollContainer from "./components/poll/PollContainer";
import YouTubeLive from "./components/YouTubeLive";
import setting from "../setting.json";

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

  return (
    <>
      <Header />

      <div className="container">
        <div className="braking_news row">
          <h4 className="braking_heding col-1">News</h4>
          <div
            id="newsIndicators"
            className="carousel slide col-11"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item">
                <a href="#">
                  There are many variations of passages of Lorem Ipsum available
                </a>
              </div>
              <div className="carousel-item active carousel-item-left">
                <a href="#">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry
                </a>
              </div>
              <div className="carousel-item carousel-item-next carousel-item-left">
                <a href="#">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text
                </a>
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

            <ul className="row magazine">
              <li className="col-md-4 col-sm-6">
                <a href="/news-details">
                  Earned $9,000,000 per Year with a Magazine Wesbite
                </a>
              </li>
              <li className="col-md-4 col-sm-6">
                <a href="/news-details">
                  The man who builds up private libraries - book by rare book
                </a>
              </li>
              <li className="col-md-4 col-sm-6">
                <a href="/news-details">
                  Futures Firm Cboe Filed for 6 Bitcoin ETFs This Week
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="post_section">
        <div className="container">
          <div className="row post_section_inner">
            <div className="col-lg-8 left_sidebar">
              <div className="row tranding_post_area">
                <div className="col-12 tranding_tittle">
                  <h2>Blog</h2>
                  <a href="/blog">
                    View More <i className="fa fa-arrow-right" />
                  </a>
                </div>

                {textBlogs.slice(0, 4).map((item) => (
                  <div className="col-md-6" key={item._id}>
                    <div className="tranding_post">
                      <Link
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
                          {item.categories?.[0]?.name}
                        </span>
                      </Link>

                      <div className="post_content">
                        <a
                          href={`/blog-details/${item.slug}`}
                          className="t_heding"
                        >
                          {item.title}
                        </a>

                        <h6>
                          {new Date(item.createdAt).toDateString()}{" "}
                          <span>|</span> Admin
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row feature_post_area">
                <div className="col-12">
                  <div className="feature_tittle">
                    <h2>Report</h2>
                    <a href="/blog">
                      View More <i className="fa fa-arrow-right" />
                    </a>
                  </div>
                </div>

                {/* FILTER: Only text blogs (videoType !== "1") */}
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
                            {/* <img
                              src={
                                item.thumbnail
                                  ? `https://api.igistrategy.com/uploads/images/${item.thumbnail}`
                                  : "https://via.placeholder.com/400x300?text=No+Image"
                              }
                              alt={item.title}
                            /> */}
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
              </div>

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
                <h2>Trending News</h2>

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

              <div className="video_widget">
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
              </div>
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

      <footer className="footer_area">
        <div className="container">
          <div className="footer_inner row">
            <div className="col-lg-5 col-md-6 footer_logo">
              {/* <a href="/"><img src="https://themazine.com/html/mora-blog/images/logo.png" alt="" /></a> */}
              <h6 className="kyr-ground" style={{ color: "white" }}>
                IGI Strategy
              </h6>
              <p>
                Established in 2013 as the first cloud mining provider, Blog has
                become a multi-functional Blog Categories, trusted by over a
                million users.
              </p>
              <address>
                <span>LOCATION</span>
                <p>
                  19 B, Vidhansabha Marg (Near Akashwani) Hazratganj Lucnkow,
                  226001
                </p>
              </address>
            </div>

            <div className="col-lg-5 col-md-6">
              <div className="subscribe">
                <h4>Subscribe</h4>
                <p>
                  Sign up for our mailing list to get latest updates and offers
                </p>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="" />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fa fa-paper-plane" />
                    </span>
                  </div>
                </div>
                <h6>
                  Working Hours : Monday-Saturday <span>Close : Sunday</span>
                </h6>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 resources">
              <h4>Short Link</h4>
              <ul className="resources_list">
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <a href="#">Bug Bounty Program</a>
                </li>
                <li>
                  <a href="#">Policy</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/shop">Shop</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copy_right">
          <p>
            Copyright © 2026 <a href="#">IGI Strategy</a> Developed by{" "}
            <a href="http://techaiindia.com">TechAiIndia</a>
          </p>
        </div>
      </footer>

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
