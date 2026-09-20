const GA_MEASUREMENT_ID = 'G-2E73C0Z6LS';

window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag() {
  window.dataLayer.push(arguments);
};

window.gtag('js', new Date());
window.gtag('config', GA_MEASUREMENT_ID, {
  send_page_view: true
});

const analyticsScript = document.createElement('script');
analyticsScript.async = true;
analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
document.head.append(analyticsScript);
