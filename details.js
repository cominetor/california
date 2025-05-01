
const detailsMap = {
  "boqueria": "<h6>Curiosità</h6><p>La Rambla era un antico torrente; la Boqueria (1836) è il mercato coperto più vivace della città.</p><h6>Dove mangiare</h6><p>Prova <strong>El Quim</strong> e le sue <em>huevos con chipirones</em>.</p>",
  "barri-gotic": "<h6>Curiosità</h6><p>Cattedrale gotica con 13 oche bianche nel chiostro: simbolo degli anni della martire Eulàlia.</p>",
  "el-born": "<h6>Curiosità</h6><p>Basilica di Santa Maria del Mar, capolavoro del gotico catalano, costruita dai portuali.</p>",
  "sagrada-familia": "<h6>Curiosità</h6><p>Simbolo di Barcellona; conclusione prevista 2026. Torre di Gesù alta 172,5 m.</p>",
  "parc-guell": "<h6>Curiosità</h6><p>Mosaici <em>trencadís</em>, salamandra Drac e panchina‑serpente, Patrimonio UNESCO.</p>",
  "casa-batllo": "<h6>Curiosità</h6><p>Facciata a scaglie di drago, balconi a forma di ossa: leggenda di San Giorgio.</p>",
  "casa-mila": "<h6>Curiosità</h6><p>La Pedrera: facciata ondulata, tetto con comignoli‑guerrieri.</p>",
  "port-vell": "<p>Marina rinnovata con passerella in legno e centro commerciale Maremagnum.</p>",
  "spiaggia-barceloneta": "<p>Spiaggia urbana attrezzata; goditi uno <em>xiringuito</em> al tramonto.</p>",
  "montjuic": "<h6>Curiosità</h6><p>Castello del XVII sec. con vista a 360°. Sulle pendici il Poble Espanyol.</p>",
  "partenza": "<p>Taxi ~30 min / Aerobús ogni 5 min da Plaça Catalunya.</p>"
};

document.querySelectorAll('.list-group-item').forEach(item => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => {
    const key = item.dataset.detailKey;
    const html = detailsMap[key] || '<p class="text-muted">Dettagli non disponibili.</p>';
    document.getElementById('detailCanvasLabel').textContent = item.innerText.trim();
    document.getElementById('detailBody').innerHTML = html;
    bootstrap.Offcanvas.getOrCreateInstance('#detailCanvas').show();
  });
});
