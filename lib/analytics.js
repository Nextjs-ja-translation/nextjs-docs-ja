export const GA_TRACKING_ID = 'UA-xxxxxxxxx-x';

export const trackPageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_location: url
  });
};

export const trackEvent = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
};
