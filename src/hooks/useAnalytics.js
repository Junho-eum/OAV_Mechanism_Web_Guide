export default function useAnalytics() {
  return {
    track: (event, props = {}) => {
      // wire to gtag/MP/PostHog later
      // console.log("analytics:", event, props);
    },
  };
}
