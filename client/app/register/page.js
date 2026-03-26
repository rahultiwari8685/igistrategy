"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://127.0.0.1:5000/api/customers/saveCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        alert("Registration successful");
        router.push("/login");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      {/* Page Header */}
      <div className="container">
        <div className="pages_heder">
          <h2>Register Page</h2>
          <ol className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#">Pages</a>
            </li>
            <li>
              <a className="active">Register</a>
            </li>
          </ol>
        </div>
      </div>

      {/* Register Form */}
      <section className="login_area">
        <div className="container">
          <div className="login_inner">
            <form className="row login_from" onSubmit={handleSubmit}>
              {error && <div className="col-12 text-danger mb-3">{error}</div>}

              <div className="form-group col-12">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

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

              <div className="form-group col-12">
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group larg_btn col-12">
                <button className="defult_btn" type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>

              <div className="form-group col-sm-6">
                <a href="#" className="reset_btn">
                  Reset Password
                </a>
              </div>

              <div className="form-group col-sm-6 text-right">
                <a href="/login" className="reset_btn">
                  Login
                </a>
              </div>

              <h4 className="col-12">or sign up with</h4>

              <div className="form-group col-sm-6">
                <a href="#" className="google_btn">
                  <img src="/images/google.png" alt="" /> GOOGLE
                </a>
              </div>

              <div className="form-group col-sm-6">
                <a href="#" className="google_btn">
                  <i className="fa fa-facebook"></i> Facebook
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
