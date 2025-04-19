
let map, infoWindow, markers={}, places={}, itineraryData;
let mapVisible=false;

function toggleMap(){
  const mapDiv=document.getElementById('map');
  mapVisible=!mapVisible;
  mapDiv.classList.toggle('d-none');
  if(mapVisible && map){ google.maps.event.trigger(map,'resize'); }
}

function appInit(){
  initMap();
  loadData();
}

async function loadData(){
  places = Object.fromEntries((await (await fetch('places.json')).json()).map(p=>[p.id,p]));
  itineraryData = await (await fetch('itinerary.json')).json();
  buildDays(itineraryData.days);
  addMarkers();
}

function buildDays(days){
  const acc=document.getElementById('itinerary');
  acc.innerHTML='';
  days.forEach((d,i)=>{
    acc.insertAdjacentHTML('beforeend',`
    <div class="accordion-item">
      <h2 class="accordion-header" id="h${i}">
        <button class="accordion-button ${i?'collapsed':''}" type="button" data-bs-toggle="collapse" data-bs-target="#c${i}">${d.date} – ${d.title}</button>
      </h2>
      <div id="c${i}" class="accordion-collapse collapse ${i?'':'show'}">
        <div class="accordion-body" id="b${i}"></div>
      </div>
    </div>`);
    const body=document.getElementById('b'+i);
    d.sections.forEach(sec=>{
      body.insertAdjacentHTML('beforeend',`<h6>${sec.label}</h6>`);
      const ul=document.createElement('ul');ul.className='list-unstyled';
      body.appendChild(ul);
      sec.items.forEach(it=>{
        let html=it.text;
        let ids=[];
        if(it.place) ids.push(it.place);
        if(it.places) ids=ids.concat(it.places);
        ids.forEach(id=>{
          if(!id||!places[id]) return;
          const p=places[id];
          html = html.replace(p.name,`<a href="#" onclick="showDetail('${p.id}');return false;">${p.name}</a>`);
        });
        ul.insertAdjacentHTML('beforeend',`<li>• ${html}</li>`);
      });
    });
  });
}

function initMap(){
  map=new google.maps.Map(document.getElementById('map'),{
    center:{lat:41.387,lng:2.17},
    zoom:13
  });
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      const me={lat:pos.coords.latitude,lng:pos.coords.longitude};
      new google.maps.Marker({position:me,map,title:'Tu'});
      map.setCenter(me);
    });
  }
}

function addMarkers(){
  for(const id in places){
    const p=places[id];
    const marker=new google.maps.Marker({
      position:{lat:p.lat,lng:p.lon},
      map,
      title:p.name
    });
    marker.addListener('click',()=>showDetail(id));
    markers[id]=marker;
  }
}

function showDetail(id){
  const p=places[id]; if(!p) return;
  document.getElementById('detailTitle').textContent=p.name;
  document.getElementById('detailBody').innerHTML=`
    <p>${p.description||''}</p>
    <p><strong>Indirizzo:</strong> ${p.address}<br>
       <strong>Orari:</strong> ${p.hours}<br>
       <strong>Prezzo:</strong> ${p.price}</p>`;
  document.getElementById('detailLink').href=p.website;
  new bootstrap.Modal(document.getElementById('detailModal')).show();
  if(map && markers[id]) map.panTo(markers[id].getPosition());
}

function filterDays(){
  const q=document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('.accordion-item').forEach(card=>{
    card.style.display=card.textContent.toLowerCase().includes(q)?'':'none';
  });
}

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js');
}
