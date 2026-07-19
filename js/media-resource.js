document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-video-panel]").forEach((panel) => {
    const video = panel.querySelector("[data-resource-video]");
    if (!video) return;

    const markAvailable = () => panel.classList.add("has-video");
    const markUnavailable = () => panel.classList.remove("has-video");

    if (video.readyState >= 1) markAvailable();
    video.addEventListener("loadedmetadata", markAvailable, { once: true });
    video.addEventListener("error", markUnavailable);
    video.querySelectorAll("source").forEach((source) => {
      source.addEventListener("error", markUnavailable);
    });
  });
});
