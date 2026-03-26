"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import setting from "../../setting.json";

export default function About() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(setting.api + "/api/customer-auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid email or password");
        return;
      }

      localStorage.setItem(
        "logininfo",
        JSON.stringify({
          token: data.token,
          role: "customer",
          customer_id: data.customer.id,
          name: data.customer.name,
          email: data.customer.email,
        }),
      );

      router.push("/dashboard");
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="container">
        <div className="pages_heder">
          <h2>Login Page</h2>
          <ol className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            {/* <li><a href="#">Pages</a></li> */}
            <li>
              <a className="active">Login Page</a>
            </li>
          </ol>
        </div>
      </div>

      <section className="login_area">
        <div className="container">
          <div className="login_inner">
            <form className="row login_from" onSubmit={handleSubmit}>
              {error && <div className="col-12 text-danger mb-3">{error}</div>}

              <div className="form-group col-12">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group col-12">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group larg_btn col-12">
                <button className="defult_btn" type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>

              <div className="form-group col-sm-6">
                <a href="#" className="reset_btn">
                  Reset Password
                </a>
              </div>

              <div className="form-group col-sm-6">
                <a href="/register" className="reset_btn">
                  Sign Up
                </a>
              </div>

              {/* <h4 className="col-12">or login in with</h4>

                            <div className="form-group col-sm-6">
                                <a href="#" className="google_btn">
                                    <img src="/images/google.png" alt="" /> GOOGLE
                                </a>
                            </div>

                            <div className="form-group col-sm-6">
                                <a href="#" className="google_btn">
                                    <i className="fa fa-facebook"></i> Facebook
                                </a>
                            </div> */}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
