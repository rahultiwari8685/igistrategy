"use client";

import { useState } from "react";

export default function Footer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    home: false,
    blog: false,
    shop: false,
    page: false,
    submenu: false,
  });

  const toggleDropdown = (name) => {
    setDropdowns({
      ...dropdowns,
      [name]: !dropdowns[name],
    });
  };

  return (
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
  );
}
