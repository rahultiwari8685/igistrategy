"use client";

import { Suspense } from "react";
import CheckoutContent from "./CheckoutContent";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center">
          <h3>Loading checkout...</h3>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
