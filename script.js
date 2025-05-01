// --- Theme toggle with localStorage + Bootstrap 5.3 data‑bs‑theme ---
(function(){
  const html = document.documentElement;
  const btn  = document.getElementById('toggleDark');
  const stored = localStorage.getItem('theme');
  if(stored){ html.setAttribute('data-bs-theme', stored); }
  btn?.addEventListener('click', ()=>{
    const newTheme = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
})();

// --- Scroll‑to‑top button reveal with IntersectionObserver ---
(function(){
  const btn = document.getElementById('scrollTop');
  const header = document.querySelector('nav');
  const io = new IntersectionObserver(([entry])=>{
    if(entry.isIntersecting){
      btn.classList.remove('show');
    }else{
      btn.classList.add('show');
    }
  });
  if(header){ io.observe(header); }
  btn?.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));
})();

// --- Lazy‑load Google Maps only when #map is near viewport ---
(function(){
  const MAPS_API_KEY = 'YOUR_API_KEY_HERE'; // 🔒 Restrict this key by referrer in Google Cloud Console
  const mapEl = document.getElementById('map');
  if(!mapEl) return;

  let loaded = false;
  const io = new IntersectionObserver(([entry])=>{
    if(entry.isIntersecting && !loaded){
      const s=document.createElement('script');
      s.src=`https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&callback=initMap`;
      s.async=true;
      document.head.appendChild(s);
      loaded = true;
      io.disconnect();
    }
  },{rootMargin:'300px'});
  io.observe(mapEl);
})();

// --- Basic initMap with sample markers ---
function initMap(){
  const BCN = {lat:41.3851,lng:2.1734};
  const map = new google.maps.Map(document.getElementById('map'),{
    center:BCN, zoom:13, mapTypeControl:false
  });
  // Optional: declare window.poi = [{t:'Sagrada Família',lat:...,lng:...}, ...] before maps is loaded.
  (window.poi||[]).forEach(p=>{
    new google.maps.Marker({position:{lat:p.lat,lng:p.lng},title:p.t,map});
  });
}