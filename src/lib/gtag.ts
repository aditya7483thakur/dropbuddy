export const GA_TRACKING_ID = "G-E6FB2D835Z";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== "undefined") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  params,
}: {
  action: string;
  params?: Record<string, unknown>;
}) => {
  if (typeof window !== "undefined") {
    window.gtag("event", action, params);
  }
};

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: "config" | "event",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
