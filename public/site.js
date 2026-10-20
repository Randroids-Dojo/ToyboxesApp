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
