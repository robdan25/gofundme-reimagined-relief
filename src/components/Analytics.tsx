import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view with GA4
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname,
        page_title: document.title,
      });
    }
  }, [location.pathname]);

  return null;
};

// Extend window type to include gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
