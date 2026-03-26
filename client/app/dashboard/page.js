"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import setting from "../../setting.json";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const logininfo = JSON.parse(localStorage.getItem("logininfo"));

    if (!logininfo?.token) {
      router.push("/login");
      return;
    }

    fetch(`${setting.api}/api/customers/dashboard`, {
      headers: {
        Authorization: `Bearer ${logininfo.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDashboard(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container py-20 text-center">
          <h3>Loading dashboard...</h3>
        </div>
        <Footer />
      </>
    );
  }

  if (!dashboard) return null;

  const { customer, subscription, reports } = dashboard;

  return (
    <>
      <Header />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {customer.name} 👋
            </h1>
            <p className="text-gray-600">Here’s an overview of your account</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow p-6">
              <h4 className="text-sm text-gray-500 mb-2">Subscription</h4>
              <h2 className="text-xl font-semibold text-gray-900">
                {subscription?.plan || "No Active Plan"}
              </h2>

              <p
                className={`mt-2 text-sm font-medium
                ${subscription?.status === "active" ? "text-green-600" : "text-red-600"}`}
              >
                {subscription?.status === "active" ? "Active" : "Inactive"}
              </p>

              {subscription?.end_date && (
                <p className="text-sm text-gray-500 mt-1">
                  Valid till {new Date(subscription.end_date).toDateString()}
                </p>
              )}

              <Link
                href="/pricing"
                className="inline-block mt-4 text-blue-600 font-medium text-sm"
              >
                {subscription?.status === "active"
                  ? "Upgrade Plan →"
                  : "Subscribe Now →"}
              </Link>
            </div>

            {/* REPORT USAGE */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h4 className="text-sm text-gray-500 mb-2">Reports Access</h4>

              <h2 className="text-xl font-semibold text-gray-900">
                {subscription?.report_limit || "0"}
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                Viewed: {reports.viewed}
              </p>

              <Link
                href="/my-reports"
                className="inline-block mt-4 text-blue-600 font-medium text-sm"
              >
                View My Reports →
              </Link>
            </div>

            {/* QUICK ACTION */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
              <h4 className="text-sm opacity-90 mb-2">Quick Action</h4>
              <h2 className="text-xl font-semibold mb-3">
                Explore Latest Reports
              </h2>

              <Link
                href="/report"
                className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm"
              >
                Go to Reports
              </Link>
            </div>
          </div>

          {/* RECENT REPORTS */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Recently Viewed Reports
            </h2>

            {reports.recent.length === 0 ? (
              <p className="text-gray-500">
                You haven’t viewed any reports yet.
              </p>
            ) : (
              <ul className="divide-y">
                {reports.recent.map((r) => (
                  <li key={r.id} className="py-3 flex justify-between">
                    <span>{r.title}</span>
                    <Link
                      href={`/shop/${r.id}`}
                      className="text-blue-600 text-sm"
                    >
                      View →
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
