/* =====================================================================
   Unidad 1: Grafos
   ===================================================================== */
(function() {
  "use strict";
  const APP = window.APP;
  const h = APP.h;

  APP.register({
    id: "u1",
    title: "1 · Grafos",
    group: "Estructuras",
    render: function(el) {
      el.innerHTML = `
        <div class="utitle">
          <div class="unum">1</div>
          <h2 class="sec">Grafos</h2>
        </div>
        <p class="lead">Un grafo modela un problema como un conjunto de elementos (vértices) y relaciones entre ellos (aristas).</p>
        <div class="card">
          <h3><span class="dot"></span>Concepto y grado</h3>
          <p><span class="k">Definición:</span> un grafo se define como <span class="hl mono">G = (V, A)</span>, donde <b>V</b> es el conjunto de vértices/nodos y <b>A</b> el conjunto de aristas.</p>
        </div>
      `;
    }
  });
})();
