// All content and download links work without JavaScript.
const switcher = document.querySelector(".view-switch");
if (switcher) {
  const buttons = [...switcher.querySelectorAll("button")];
  const choose = (view) => {
    for (const button of buttons) {
      const selected = button.dataset.view === view;
      button.setAttribute("aria-pressed", String(selected));
      document.getElementById(button.getAttribute("aria-controls")).hidden =
        !selected;
    }
  };
  for (const button of buttons)
    button.addEventListener("click", () => choose(button.dataset.view));
  choose("stage");
  switcher.hidden = false;
}
// The music video links to YouTube. Pressed here, YouTube's privacy-enhanced player takes the still's place.
for (const link of document.querySelectorAll("a[data-video]")) {
  link.addEventListener("click", (event) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const player = document.createElement("iframe");
    player.src = `https://www.youtube-nocookie.com/embed/${link.dataset.video}?autoplay=1&rel=0&playsinline=1`;
    player.title = link.dataset.title;
    player.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    player.allowFullscreen = true;
    player.referrerPolicy = "strict-origin-when-cross-origin";
    const frame = document.createElement("div");
    frame.className = "k-video-frame";
    frame.append(player);
    link.replaceWith(frame);
    player.focus();
  });
}
