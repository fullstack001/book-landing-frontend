"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import DeliveryPage from "@/components/DeliveryPage";

export default function ConfirmationPage() {
  const params = useParams();
  const token = params.token as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deliveryData, setDeliveryData] = useState<any>(null);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await api.confirmEmail(token);
        setDeliveryData(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            "Failed to confirm email. The link may have expired."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      confirmEmail();
    }
  }, [token]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error || !deliveryData) {
    return <ErrorPage error={error || "Invalid confirmation link"} />;
  }

  return (
    <DeliveryPage
      book={deliveryData.book}
      downloadUrl={deliveryData.downloadUrl}
      expirationDays={deliveryData.expirationDays}
      userEmail={deliveryData.userEmail}
      availableFormats={deliveryData.availableFormats}
      confirmationToken={token}
    />
  );
}
