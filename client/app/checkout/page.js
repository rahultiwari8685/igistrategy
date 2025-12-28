"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Checkout() {
  return (
    <>
      <Header />

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">

          {/* Page Heading */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Checkout
            </h1>
            <p className="text-gray-600">
              Review your plan details before payment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: Plan Details */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Selected Plan
              </h2>

              <div className="border rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      State Plan
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Access state & constituency level reports
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                    Monthly
                  </span>
                </div>

                <ul className="text-sm text-gray-700 space-y-2 mb-4">
                  <li>✔ State & Constituency Reports</li>
                  <li>✔ Election Trends</li>
                  <li>✔ Priority Email Support</li>
                </ul>

                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-gray-600">Plan Price</span>
                  <span className="text-xl font-bold text-gray-900">
                    ₹1,499
                  </span>
                </div>
              </div>

              {/* User Info */}
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

            {/* Right: Order Summary */}
            <div className="bg-white rounded-2xl shadow p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3 text-gray-700">
                <span>State Plan</span>
                <span>₹1,499</span>
              </div>

              <div className="flex justify-between mb-3 text-gray-700">
                <span>GST (18%)</span>
                <span>₹270</span>
              </div>

              <div className="flex justify-between border-t pt-3 font-semibold text-gray-900">
                <span>Total Payable</span>
                <span>₹1,769</span>
              </div>

              {/* Pay Button */}
              <button
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
