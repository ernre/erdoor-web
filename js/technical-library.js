document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("[data-document-grid]");
  const search = document.querySelector("[data-document-search]");
  const filters = document.querySelector("[data-document-filters]");
  const empty = document.querySelector("[data-document-empty]");
  if (!grid || !window.ERDOOR_DOCUMENTS) return;

  let activeCategory = "all";

  const render = () => {
    const term = (search?.value || "").trim().toLowerCase();
    const documents = window.ERDOOR_DOCUMENTS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const searchable = `${item.title} ${item.type} ${item.description}`.toLowerCase();
      return matchesCategory && searchable.includes(term);
    });

    grid.innerHTML = documents.map((item) => `
      <article class="document-card">
        <div class="document-icon"><i class="fa-solid ${item.icon}" aria-hidden="true"></i></div>
        <p class="document-type">${item.type}</p>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="document-actions">
          <a href="document-viewer.html?document=${encodeURIComponent(item.id)}" class="document-view-link">Open flipbook <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
          <a href="${item.path}" download class="document-download" aria-label="Download ${item.title}"><i class="fa-solid fa-download" aria-hidden="true"></i></a>
        </div>
      </article>
    `).join("");

    if (empty) empty.hidden = documents.length > 0;
  };

  filters?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    filters.querySelectorAll("[data-category]").forEach((item) => item.classList.toggle("is-active", item === button));
    render();
  });

  search?.addEventListener("input", render);
  render();
});
