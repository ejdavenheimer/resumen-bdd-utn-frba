/* =====================================================================
   GDD UTN — arranque, navegación y routing
   La navegación es una lista plana, en el mismo orden en que se incluyen
   los <script> de js/content/ en index.html.
   ===================================================================== */
(function () {
  "use strict";
  const APP = window.APP;
  const SITE = APP.title || "GDD UTN";
  const navEl = document.getElementById("nav");
  const contentEl = document.getElementById("content");

  function buildNav() {
    // Limpiar los <a> existentes que no sean grupos
    const links = navEl.querySelectorAll("a");
    const grps = navEl.querySelectorAll(".grp");
    navEl.innerHTML = "";
    
    // Re-construir desde las secciones registradas
    let currentGroup = null;
    
    APP.sections.forEach((s) => {
      if (s.group && s.group !== currentGroup) {
        const grpEl = document.createElement("span");
        grpEl.className = "grp";
        grpEl.textContent = s.group;
        navEl.appendChild(grpEl);
        currentGroup = s.group;
      }
      
      const a = document.createElement("a");
      a.className = "nav-link";
      a.href = "#" + s.id;
      a.dataset.id = s.id;
      a.innerHTML =
        "<span>" + s.title + "</span>" +
        (s.tag ? '<span class="tag">' + s.tag + "</span>" : "");
      navEl.appendChild(a);
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
    document.querySelectorAll(".nav-link").forEach((a) => {
      a.classList.toggle("active", a.dataset.id === id);
    });
    
    // Scroll del contenedor principal al inicio
    contentEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function init() {
    buildNav();

    // Routing por hash
    function navigate() {
      const id = (location.hash.slice(1) || APP.sections[0]?.id || "");
      renderSection(id);
    }

    window.addEventListener("hashchange", navigate);
    navigate();
  }

  init();
})();
