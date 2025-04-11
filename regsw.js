//Service-worker implementation
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
  navigator.serviceWorker.register('/Caffeine_Movie/service-worker.js');
  });
}