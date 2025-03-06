"use client";

import { useEffect } from "react";

const SuccessPage = () => {
  useEffect(() => {
    const finishSession = async () => {
      await fetch("/api/checkout/success", {
        method: "POST",
        body: JSON.stringify({ completeSession: true }),
      });
    };
    finishSession();
  }, []);
  return <div>Thank you for your order!</div>;
};
export default SuccessPage;
