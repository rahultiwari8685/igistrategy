"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Pricing() {
    const [billing, setBilling] = useState("monthly");

    return (
        <>
            <Header />



            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">


                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">
                            Choose the Right Plan for You
                        </h1>
                        <p className="text-gray-600">
                            Flexible plans for individuals, analysts & enterprises
                        </p>
                    </div>

                    <div className="flex justify-center mb-16">
                        <div className="relative bg-white shadow rounded-full p-1 w-[220px]">

                            {/* Sliding Background */}
                            <span
                                className={`absolute top-1 left-1 h-[40px] w-[100px] rounded-full bg-blue-600 transition-all duration-300
        ${billing === "yearly" ? "translate-x-[110px]" : "translate-x-0"}
      `}
                            />

                            <div className="relative flex justify-between">
                                <button
                                    onClick={() => setBilling("monthly")}
                                    className={`w-1/2 text-sm font-medium z-10 py-2
          ${billing === "monthly" ? "text-white" : "text-gray-600"}
        `}
                                >
                                    Monthly
                                </button>

                                <button
                                    onClick={() => setBilling("yearly")}
                                    className={`w-1/2 text-sm font-medium z-10 py-2
          ${billing === "yearly" ? "text-white" : "text-gray-600"}
        `}
                                >
                                    Yearly
                                </button>
                            </div>

                        </div>
                    </div>



                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* Basic Plan */}
                        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col">
                            <h3 className="text-xl font-semibold mb-2">Basic</h3>
                            <p className="text-gray-600 mb-6">
                                Ideal for individuals getting started.
                            </p>

                            <div className="mb-6">
                                <span className="text-4xl font-bold">
                                    {billing === "monthly" ? "₹499" : "₹4,799"}
                                </span>
                                <span className="text-gray-500 text-sm">
                                    /{billing === "monthly" ? "mo" : "yr"}
                                </span>
                            </div>

                            <ul className="text-sm text-gray-700 mb-6 space-y-2">
                                <li>✔ Limited Political Reports</li>
                                <li>✔ National Overview</li>
                                <li>✔ Email Support</li>
                            </ul>


                            <Link
                                href="/checkout"
                                className="mt-auto block text-center py-2 rounded-lg font-medium transition
    border border-blue-600 text-blue-600 hover:bg-blue-50"
                            >
                                Choose Plan
                            </Link>

                        </div>

                        {/* State Plan (Most Popular) */}
                        <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-600 p-6 flex flex-col relative">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-4 py-1 rounded-full">
                                Most Popular
                            </span>

                            <h3 className="text-xl font-semibold mb-2">State Plan</h3>
                            <p className="text-gray-600 mb-6">
                                Deep insights for a selected state.
                            </p>

                            <div className="mb-6">
                                <span className="text-4xl font-bold">
                                    {billing === "monthly" ? "₹1,499" : "₹14,399"}
                                </span>
                                <span className="text-gray-500 text-sm">
                                    /{billing === "monthly" ? "mo" : "yr"}
                                </span>
                            </div>

                            <ul className="text-sm text-gray-700 mb-6 space-y-2">
                                <li>✔ State & Constituency Reports</li>
                                <li>✔ Election Trends</li>
                                <li>✔ Priority Email Support</li>
                            </ul>

                            <Link
                                href="/checkout"
                                className="mt-auto block text-center py-2 rounded-lg font-medium transition
    border border-blue-600 text-blue-600 hover:bg-blue-50"
                            >
                                Choose Plan
                            </Link>


                        </div>

                        {/* All India Plan */}
                        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col">
                            <h3 className="text-xl font-semibold mb-2">All India</h3>
                            <p className="text-gray-600 mb-6">
                                Nationwide political intelligence.
                            </p>

                            <div className="mb-6">
                                <span className="text-4xl font-bold">
                                    {billing === "monthly" ? "₹2,999" : "₹28,799"}
                                </span>
                                <span className="text-gray-500 text-sm">
                                    /{billing === "monthly" ? "mo" : "yr"}
                                </span>
                            </div>

                            <ul className="text-sm text-gray-700 mb-6 space-y-2">
                                <li>✔ All States Access</li>
                                <li>✔ National + Regional Reports</li>
                                <li>✔ Historical Data</li>
                            </ul>

                            <Link
                                href="/checkout"
                                className="mt-auto block text-center py-2 rounded-lg font-medium transition
    border border-blue-600 text-blue-600 hover:bg-blue-50"
                            >
                                Choose Plan
                            </Link>


                        </div>

                        {/* Corporate Plan */}
                        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col">
                            <h3 className="text-xl font-semibold mb-2">Corporate</h3>
                            <p className="text-gray-600 mb-6">
                                Enterprise-grade political & corporate intelligence.
                            </p>

                            <div className="mb-6">
                                <span className="text-4xl font-bold">
                                    {billing === "monthly" ? "₹9,999" : "₹95,999"}
                                </span>
                                <span className="text-gray-500 text-sm">
                                    /{billing === "monthly" ? "mo" : "yr"}
                                </span>
                            </div>

                            <ul className="text-sm text-gray-700 mb-6 space-y-2">
                                <li>✔ Political + Corporate Reports</li>
                                <li>✔ Custom Research Access</li>
                                <li>✔ Dedicated Support</li>
                            </ul>

                            <Link
                                href="/checkout"
                                className="mt-auto block text-center py-2 rounded-lg font-medium transition
      border border-blue-600 text-blue-600 hover:bg-blue-50"
                            >
                                Choose Plan
                            </Link>
                        </div>


                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
