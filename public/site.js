// All content, download links and the waitlist form work without JavaScript.
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

// Waitlist: submit in place and answer inline. Without this, the form posts
// normally and the server redirects to a thank-you or try-again page.
for (const form of document.querySelectorAll("form[data-waitlist]")) {
  const email = form.querySelector('input[type="email"]');
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector(".waitlist-status");
  const label = button.textContent;
  const say = (state, message) => {
    status.dataset.state = state;
    status.textContent = message;
  };
  email.addEventListener("input", () => {
    if (status.dataset.state === "error") say("", "");
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (button.disabled) return;
    button.disabled = true;
    button.textContent = "Joining…";
    say("", "");
    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(new FormData(form)),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.ok) {
        say("ok", "You’re on the list. We’ll email you when Keepsies opens.");
        button.textContent = "You’re in";
        email.readOnly = true;
        status.focus();
        return;
      }
      say(
        "error",
        result.message || "That didn’t go through. Please try again.",
      );
      email.focus();
    } catch {
      say("error", "We couldn’t reach the server. Check your connection and try again.");
      email.focus();
    }
    button.disabled = false;
    button.textContent = label;
  });
}
