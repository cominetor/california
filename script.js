
function initMap(){
  const map = new google.maps.Map(document.getElementById('map'),{center:{lat:41.387,lng:2.17},zoom:13});
}
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('toggleDark').addEventListener('click',()=>{
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-light');
  });
  const s = document.getElementById('scrollTop');
  window.addEventListener('scroll',()=>{ s.style.display = window.scrollY>300?'block':'none'; });
  s.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
});
