export default function register() {
  const { NODE_ENV, PUBLIC_URL } = process.env;
  if ('serviceWorker' in navigator) {
    if (navigator.serviceWorker.controller) return;
    const swUrl = `${PUBLIC_URL}/internalSW.js`;
    navigator.serviceWorker.register(swUrl).then(
      reg => {
        if (NODE_ENV === 'production') return;
        console.log('Internal Service Worker registration succeeded:', reg)
      },
      err => console.warn('Internal Service Worker registration failed:', err),
    );
  }
}
