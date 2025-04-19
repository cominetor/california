
let places = {};
let map, markersLayer;

function badge(cat){
  switch(cat){
    case 'restaurant': return 'restaurant';
    case 'bar': return 'bar';
    case 'cafe': return 'cafe';
    case 'monument': return 'monument';
    case 'viewpoint': return 'viewpoint';
    case 'event': return 'event';
    case 'hotel': return 'secondary';
    case 'park': return 'success';
    case 'market': return 'warning';
    default: return 'light';
  }
}

async function loadData(){
  const pRes = await fetch('places.json');
  const pJson = await pRes.json();
  pJson.forEach(p=>places[p.id]=p);

  const res = await fetch('itinerary.json');
  const data = await res.json();
  buildDays(data.days);
  initMap();
}

function buildDays(days){
  const acc = document.getElementById('itinerary');
  acc.innerHTML='';
  days.forEach((d,i)=>{
    const card = document.createElement('div');
    card.className='accordion-item';
    card.innerHTML = `
      <h2 class="accordion-header" id="heading${i}">
        <button class="accordion-button ${i>0?'collapsed':''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="${i==0?'true':'false'}" aria-controls="collapse${i}">
          ${d.date} – ${d.title}
        </button>
      </h2>
      <div id="collapse${i}" class="accordion-collapse collapse ${i==0?'show':''}" aria-labelledby="heading${i}" data-bs-parent="#itinerary">
        <div class="accordion-body" id="body${i}"></div>
      </div>`;
    acc.appendChild(card);
    const bodyDiv = card.querySelector(`#body${i}`);
    d.sections.forEach(sec=>{
      const h = document.createElement('h6');
      h.textContent = sec.label;
      bodyDiv.appendChild(h);
      const ul=document.createElement('ul');
      ul.className='list-unstyled';
      bodyDiv.appendChild(ul);

      sec.items.forEach(it=>{
        const li=document.createElement('li');
        li.className='mb-1';
        let content = it.text;
        let ids = [];
        if(it.place) ids.push(it.place);
        if(it.places) ids=ids.concat(it.places);
        if(ids.length){
          ids.forEach(id=>{
            if(!id) return;
            const p = places[id];
            if(!p) return;
            const link = `<a class="place-link" href="${p.url}" target="_blank">${p.name}</a>`;
            content = content.replace(p.name, link);
          });
        }
        li.innerHTML = '• ' + content;
        ul.appendChild(li);
      });
    });
  });
}

function initMap(){
  map = L.map('map',{scrollWheelZoom:false}).setView([41.387,2.17], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 19,
    attribution:'© OpenStreetMap'
  }).addTo(map);
  markersLayer = L.layerGroup().addTo(map);
  for(const id in places){
    const p = places[id];
    const m = L.marker([p.lat,p.lon]).bindPopup(`<strong>${p.name}</strong><br><a href="${p.url}" target="_blank">Apri link</a>`);
    m.addTo(markersLayer);
  }
  map.fitBounds(markersLayer.getBounds().pad(0.2));
}

function toggleMap(){
  const mapDiv = document.getElementById('map');
  mapDiv.classList.toggle('d-none');
  if(!mapDiv.classList.contains('d-none')){
    setTimeout(()=>{ map.invalidateSize(); }, 200);
  }
}

function filterDays(){
  const q = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('.accordion-item').forEach(item=>{
    item.style.display = item.textContent.toLowerCase().includes(q)?'':'none';
  });
}

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js');
}

loadData();
