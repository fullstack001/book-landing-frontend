"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { getTheme } from "@/lib/themes";
import {
  getPageSettings,
  getHeadingText,
  getPageText,
  replacePlaceholders,
  needsEmailCapture,
  shouldAskFirstName,
  shouldAskLastName,
} from "@/lib/utils";
import { LandingPage } from "@/types";
import LandingPageView from "@/components/LandingPageView";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";

export default function LandingPageRoute() {
  const params = useParams();
  const id = params.id as string;

  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLandingPage();
  }, [id]);

  const fetchLandingPage = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getLandingPageById(id);

      setLandingPage(data);
    } catch (err: any) {
      console.error("Failed to fetch landing page:", err);
      setError(err.response?.data?.message || "Landing page not found");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error || !landingPage) {
    return <ErrorPage error={error || "Landing page not found"} />;
  }

  return <LandingPageView landingPage={landingPage} />;
}
