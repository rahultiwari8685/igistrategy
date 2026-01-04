"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import setting from "../../setting.json";

export default function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const planId = searchParams.get("plan");
    const billing = searchParams.get("billing") || "monthly";

    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    /* ---------- Load Razorpay Script ---------- */
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    /* ---------- Load Plan ---------- */
    useEffect(() => {
        if (!planId) {
            router.push("/pricing");
            return;
        }

        const loadPlan = async () => {
            try {
                const res = await fetch(
                    `${setting.api}/api/plans/${planId}`
                );
                const data = await res.json();

                if (!data.success) {
                    router.push("/pricing");
                    return;
                }

                setPlan(data.data);
            } catch (err) {
                console.error(err);
                router.push("/pricing");
            } finally {
                setLoading(false);
            }
        };

        loadPlan();
    }, [planId, router]);

    /* ---------- Price Calculation ---------- */
    const basePrice = () => {
        if (!plan) return 0;
        if (billing === "monthly") return plan.price;
        return Math.round(plan.price * 12 * 0.8); // yearly discount
    };

    const price = basePrice();
    const gst = Math.round(price * 0.18);
    const total = price + gst;

    /* ---------- Payment Handler ---------- */
    const handlePayment = async () => {
        try {
            setProcessing(true);

            const logininfo = JSON.parse(localStorage.getItem("logininfo"));
            const customerId = logininfo?.customer_id;

            if (!customerId) {
                alert("Please login first");
                router.push("/login");
                return;
            }

            const res = await fetch(
                `${setting.api}/api/payments/create-order`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        customer_id: customerId,
                        plan_id: plan._id,
                    }),
                }
            );

            const data = await res.json();

            if (!data.success) {
                alert(data.message || "Failed to create order");
                return;
            }

            const options = {
                key: data.key,
                amount: data.amount * 100,
                currency: "INR",
                name: "Know Your Reality",
                description: `${plan.name} Subscription`,
                order_id: data.order_id,
                handler: function () {
                    alert("Payment successful! Subscription activating...");
                    router.push("/thank-you");
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            alert("Payment failed. Try again.");
        } finally {
            setProcessing(false);
        }
    };

    /* ---------- Loading State ---------- */
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

    /* ---------- UI ---------- */
    return (
        <>
            <Header />

            <section className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4">

                    {/* HEADER */}
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Checkout
                        </h1>
                        <p className="text-gray-600">
                            Review your plan before payment
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* LEFT */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Selected Plan
                            </h2>

                            <div className="border rounded-xl p-5 mb-6">
                                <h3 className="text-lg font-semibold">{plan.name}</h3>
                                <p className="text-gray-600 capitalize">
                                    {plan.report_limit} access · {billing}
                                </p>

                                <ul className="mt-4 text-sm space-y-2">
                                    {plan.features?.length > 0 ? (
                                        plan.features.map((f, i) => (
                                            <li key={i}>✔ {f}</li>
                                        ))
                                    ) : (
                                        <li>✔ Full platform access</li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Order Summary
                            </h2>

                            <div className="flex justify-between mb-2">
                                <span>{plan.name}</span>
                                <span>₹{price}</span>
                            </div>

                            <div className="flex justify-between mb-2">
                                <span>GST (18%)</span>
                                <span>₹{gst}</span>
                            </div>

                            <div className="flex justify-between border-t pt-3 font-bold">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={processing}
                                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
                            >
                                {processing ? "Processing..." : "Proceed to Payment"}
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-3">
                                Secure payment powered by Razorpay
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
