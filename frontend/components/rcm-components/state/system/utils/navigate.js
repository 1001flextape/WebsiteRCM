export const navigate = (href) => {
  // Check if the href is an external URL
  if (href.startsWith('//') || href.startsWith('http://') || href.startsWith('https://')) {
    window.location.href = href;  // External navigation
  } else if (href.startsWith('/')) {
    router.push(href);  // Internal navigation using Next.js router
  } else {
    console.error('Invalid URL format:', href);
  }
};