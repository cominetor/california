
async function loadItinerary(){
  const resp = await fetch('itinerary.json');
  const data = await resp.json();
  const daysDiv = document.getElementById('days');
  data.days.forEach((d, idx)=>{
    const card = document.createElement('div');
    card.className='day-card';
    card.innerHTML = `
      <div class="day-header" onclick="toggle('${idx}')">
        <span class="day-title">${d.date} – ${d.title}</span>
        <span id="ico-${idx}">▼</span>
      </div>
      <div id="sec-${idx}">
        ${d.sections.map(s=>`<section><time>${s.time}</time><br>${s.body}</section>`).join('')}
      </div>`;
    daysDiv.appendChild(card);
  });
}
function toggle(id){
  const sec = document.getElementById('sec-'+id);
  const ico = document.getElementById('ico-'+id);
  if(sec.classList.contains('hidden')){ sec.classList.remove('hidden'); ico.textContent='▼'; }
  else { sec.classList.add('hidden'); ico.textContent='▲'; }
}
function filterContent(){
  const q = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('.day-card').forEach(card=>{
    card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}
window.addEventListener('load', loadItinerary);
if('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js'); }
