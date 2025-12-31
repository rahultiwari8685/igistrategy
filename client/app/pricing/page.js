"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import setting from "../../setting.json";

export default function Pricing() {
    const [billing, setBilling] = useState("monthly");
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);


    const loadPlans = async () => {
        try {
            const res = await fetch(setting.api + "/api/plans/getAllPlans");
            const data = await res.json();

            if (data.success) {
                // show only active plans
                setPlans(data.data.filter((p) => p.is_active));
            }
        } catch (error) {
            console.error("Failed to load plans", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPlans();
    }, []);

    const getPrice = (price) => {
        if (billing === "monthly") return price;
        // yearly = 12 months - 20% discount
        return Math.round(price * 12 * 0.8);
    };

    const isPopular = (plan) => plan.report_limit === "unlimited";

    return (
        <>
            <Header />

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">

                    {/* HEADER */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">
                            Choose the Right Plan for You
                        </h1>
                        <p className="text-gray-600">
                            Flexible plans for individuals, analysts & enterprises
                        </p>
                    </div>

                    {/* BILLING TOGGLE */}
                    <div className="flex justify-center mb-16">
                        <div className="relative bg-white shadow rounded-full p-1 w-[220px]">
                            <span
                                className={`absolute top-1 left-1 h-[40px] w-[100px] rounded-full bg-blue-600 transition-all duration-300
                  ${billing === "yearly" ? "translate-x-[110px]" : "translate-x-0"}`}
                            />
                            <div className="relative flex justify-between">
                                <button
                                    onClick={() => setBilling("monthly")}
                                    className={`w-1/2 text-sm font-medium z-10 py-2
                    ${billing === "monthly" ? "text-white" : "text-gray-600"}`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBilling("yearly")}
                                    className={`w-1/2 text-sm font-medium z-10 py-2
                    ${billing === "yearly" ? "text-white" : "text-gray-600"}`}
                                >
                                    Yearly
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* PRICING GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loading ? (
                            <p className="text-center col-span-full">Loading plans...</p>
                        ) : plans.length === 0 ? (
                            <p className="text-center col-span-full">No plans available</p>
                        ) : (
                            plans.map((plan) => (
                                <div
                                    key={plan._id}
                                    className={`bg-white rounded-2xl shadow p-6 flex flex-col transition
                    ${isPopular(plan) ? "border-2 border-blue-600 shadow-lg relative" : "hover:shadow-lg"}`}
                                >
                                    {/* MOST POPULAR */}
                                    {isPopular(plan) && (
                                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-4 py-1 rounded-full">
                                            Most Popular
                                        </span>
                                    )}

                                    <h3 className="text-xl font-semibold mb-2">
                                        {plan.name}
                                    </h3>

                                    <p className="text-gray-600 mb-6 capitalize">
                                        {plan.report_limit} access · {plan.billing_cycle}
                                    </p>

                                    <div className="mb-6">
                                        <span className="text-4xl font-bold">
                                            ₹{getPrice(plan.price)}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            /{billing === "monthly" ? "mo" : "yr"}
                                        </span>
                                    </div>

                                    <ul className="text-sm text-gray-700 mb-6 space-y-2">
                                        {plan.features.length > 0 ? (
                                            plan.features.map((f, i) => (
                                                <li key={i}>{f}</li>
                                            ))
                                        ) : (
                                            <li>✔ Full platform access</li>
                                        )}
                                    </ul>

                                    <Link
                                        href={`/checkout?plan=${plan._id}`}
                                        className="mt-auto block text-center py-2 rounded-lg font-medium transition
                      border border-blue-600 text-blue-600 hover:bg-blue-50"
                                    >
                                        Choose Plan
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
