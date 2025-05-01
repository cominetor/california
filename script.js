
/**** POI list ****/
const poi={1:[{t:'Parc Güell',lat:41.4145,lng:2.1527},{t:'Sagrada Família',lat:41.4036,lng:2.1744},{t:'Casa Milà',lat:41.3954,lng:2.162},{t:'Parc de la Ciutadella',lat:41.3862,lng:2.185}],2:[{t:'Casa Batlló',lat:41.3917,lng:2.1649},{t:'Plaça Espanya',lat:41.3757,lng:2.1499},{t:'Font Màgica',lat:41.3712,lng:2.1515},{t:'Cattedrale',lat:41.384,lng:2.1761}],3:[{t:'Port Vell',lat:41.3773,lng:2.184},{t:'Barceloneta Beach',lat:41.3789,lng:2.1897},{t:'Los Tarantos',lat:41.3801,lng:2.1755}],4:[{t:'Boqueria',lat:41.3825,lng:2.1723},{t:'Santa Maria del Mar',lat:41.3839,lng:2.1823},{t:'Cal Pep',lat:41.3834,lng:2.1827}]};

/**** GOOGLE MAPS INIT ****/
let map, markers=[];
function initMap(){
  map=new google.maps.Map(document.getElementById('map'),{center:{lat:41.387,lng:2.17},zoom:13,mapId:'DEMO_MAP_ID'});
  renderMarkers(1);
}

/* Render markers for selected day */
function renderMarkers(day){
  markers.forEach(m=>m.setMap(null));
  markers=[];
  (poi[day]||[]).forEach(p=>{
    const marker=new google.maps.Marker({position:{lat:p.lat,lng:p.lng},map,title:p.t});
    const infowindow=new google.maps.InfoWindow({content:p.t});
    marker.addListener('click',()=>infowindow.open({anchor:marker,map}));
    markers.push(marker);
  });
  if(markers.length){
    const bounds=new google.maps.LatLngBounds();
    markers.forEach(m=>bounds.extend(m.getPosition()));
    map.fitBounds(bounds,50);
  }
}

/* Tab change listener */
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('#dayTabs button').forEach(btn=>{
    btn.addEventListener('shown.bs.tab',e=>{
      const idx=parseInt(e.target.id.match(/day(\d)-tab/)[1]);
      renderMarkers(idx);
    });
  });
});

/* Dark mode toggle */
document.getElementById('toggleDark').addEventListener('click',()=>{
  document.body.classList.toggle('bg-dark');document.body.classList.toggle('text-light');
});

/* Scroll top */
const scrollTopBtn=document.getElementById('scrollTop');
window.addEventListener('scroll',()=>{scrollTopBtn.style.display=window.scrollY>300?'block':'none';});
scrollTopBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
