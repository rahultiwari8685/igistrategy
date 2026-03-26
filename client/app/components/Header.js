"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    home: false,
    blog: false,
    shop: false,
    page: false,
    submenu: false,
  });

  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("logininfo"));
    setUser(info);
  }, []);

  const toggleDropdown = (name) => {
    setDropdowns({
      ...dropdowns,
      [name]: !dropdowns[name],
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("logininfo");
    router.replace("/login"); // prevents back button access
  };

  return (
    <header className="main_header_area" id="header">
      <div className="container">
        <div className="header_menu">
          <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="/">
              {/* <img
                                src="/assets/images/logo.png"
                                alt="Logo"
                                style={{ height: 45 }}
                            /> */}
              {/* <img src="images/kyr.png" alt="" height={100} width={100} /> */}
              <h6 className="kyr-ground">IGI Strategy</h6>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className="fa fa-bars" />
            </button>

            <div
              className={`navbar-collapse navbar_supported ${menuOpen ? "show" : ""}`}
            >
              <ul className="navbar-nav">
                <li>
                  <Link className="nav-link" href="/">
                    Home
                  </Link>
                </li>

                <li>
                  <Link className="nav-link" href="/about">
                    About us
                  </Link>
                </li>

                <li>
                  <Link className="nav-link" href="/blog">
                    Blog
                  </Link>
                </li>

                <li>
                  <Link className="nav-link" href="/login">
                    Reports
                  </Link>
                </li>

                <li>
                  <Link className="nav-link" href="/contact">
                    Contact us
                  </Link>
                </li>

                {user?.token ? (
                  <>
                    <li>
                      <Link className="nav-link" href="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
