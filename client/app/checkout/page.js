"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import setting from "../../setting.json";

export default function Checkout() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const planId = searchParams.get("plan");
  const billing = searchParams.get("billing") || "monthly";

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PLAN ---------------- */
  const loadPlan = async () => {
    if (!planId) {
      router.push("/pricing");
      return;
    }

    try {
      const res = await fetch(
        setting.api + `/api/plans/${planId}`
      );
      const data = await res.json();

      if (!data.success) {
        router.push("/pricing");
        return;
      }

      setPlan(data.data);
    } catch (err) {
      console.error("Failed to load plan", err);
      router.push("/pricing");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlan();
  }, [planId]);

  /* ---------------- PRICE CALC ---------------- */
  const getBasePrice = () => {
    if (!plan) return 0;
    if (billing === "monthly") return plan.price;
    // yearly = 12 months with 20% discount
    return Math.round(plan.price * 12 * 0.8);
  };

  const price = getBasePrice();
  const gst = Math.round(price * 0.18);
  const total = price + gst;

  if (loading) {
    return (
      <>
        <Header />
        <div className="container py-20 text-center">
          <h3>Loading checkout...</h3>
        </div>
        <Footer />
      </>
    );
  }

  if (!plan) return null;

  return (
    <>
      <Header />

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">

          {/* PAGE HEADER */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Checkout
            </h1>
            <p className="text-gray-600">
              Review your plan details before payment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT: PLAN DETAILS */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Selected Plan
              </h2>

              <div className="border rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 text-sm capitalize">
                      {plan.report_limit} access · {billing}
                    </p>
                  </div>

                  <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full capitalize">
                    {billing}
                  </span>
                </div>

                <ul className="text-sm text-gray-700 space-y-2 mb-4">
                  {plan.features?.length > 0 ? (
                    plan.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))
                  ) : (
                    <li>✔ Full platform access</li>
                  )}
                </ul>

                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-gray-600">Plan Price</span>
                  <span className="text-xl font-bold text-gray-900">
                    ₹{price}
                  </span>
                </div>
              </div>

              {/* BILLING DETAILS */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  Billing Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="bg-white rounded-2xl shadow p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3 text-gray-700">
                <span>{plan.name}</span>
                <span>₹{price}</span>
              </div>

              <div className="flex justify-between mb-3 text-gray-700">
                <span>GST (18%)</span>
                <span>₹{gst}</span>
              </div>

              <div className="flex justify-between border-t pt-3 font-semibold text-gray-900">
                <span>Total Payable</span>
                <span>₹{total}</span>
              </div>

              {/* PAY BUTTON */}
              <button
                onClick={() => alert("Razorpay integration next")}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Proceed to Payment
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                You will be redirected to Razorpay to complete payment securely.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
