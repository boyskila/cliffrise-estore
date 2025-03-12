"use client";

import { appFetch } from "@/lib/fetch";
import { useEffect } from "react";

const SuccessPage = () => {
  useEffect(() => {
    const finishSession = async () => {
      await appFetch("/api/checkout/success", {
        method: "POST",
        body: JSON.stringify({ completeSession: true }),
      });
    };
    finishSession();
  }, []);
  return <div>Thank you for your order!</div>;
};
export default SuccessPage;
