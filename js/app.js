/* =====================================================================
   GDD UTN — arranque, navegación y routing
   ===================================================================== */
(function () {
  "use strict";
  const APP = window.APP;
  const navEl = document.getElementById("nav");
  const contentEl = document.getElementById("content");

  function buildNav() {
    const links = navEl.querySelectorAll("a");
    links.forEach((a) => {
      a.addEventListener("click", function() {
        renderSection(this.dataset.id);
      });
    });
  }

  function renderSection(id) {
    const section = APP.sections.find((s) => s.id === id) || APP.sections[0];
    if (!section) return;

    contentEl.innerHTML = "";
    const container = document.createElement("section");
    container.id = section.id;
    try {
      section.render(container);
    } catch (e) {
      container.innerHTML =
        '<div class="note r"><b>Error al renderizar esta sección.</b><br>' +
        (e && e.message) + "</div>";
      console.error(e);
    }
    contentEl.appendChild(container);

    // Marcar enlace activo
    document.querySelectorAll("#nav a").forEach((a) => {
      a.classList.toggle("active", a.dataset.id === id);
    });
  }

  function init() {
    buildNav();

    // Routing por hash
    function navigate() {
      const id = (location.hash.slice(1) || APP.sections[0]?.id || "u1");
      renderSection(id);
    }

    window.addEventListener("hashchange", navigate);
    navigate();
  }

  // Esperar a que se registren las secciones
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
