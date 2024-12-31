document.addEventListener("DOMContentLoaded", () => {
  const calendarGrid = document.getElementById("calendar-grid");
  const resetButton = document.getElementById("reset-button");
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popup-content");
  const popupClose = document.getElementById("popup-close");
  const customDate = document.getElementById("custom-date");
  const customText = document.getElementById("custom-text");
  const addMessageButton = document.getElementById("add-message-button");

  const openedDates = new Set(
    JSON.parse(localStorage.getItem("openedDates")) || []
  );
  const customMessages =
    JSON.parse(localStorage.getItem("customMessages")) || {};

  const openSound = new Audio("sounds/christmas.mp3"); // Path to your sound file

  // Generer kalender
  for (let i = 1; i <= 24; i++) {
    const day = document.createElement("div");
    day.textContent = i;
    day.dataset.date = i;
    if (openedDates.has(i.toString())) {
      day.classList.add("opened");
    }
    calendarGrid.appendChild(day);
  }

  // Hent random joke/fact
  async function fetchJoke() {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await response.json();
      return `${data.setup} - ${data.punchline}`;
    } catch {
      return "Kunne ikke hente en vits. Prøv igjen senere!";
    }
  }

  // Håndter klikking på datoer
  calendarGrid.addEventListener("click", async (e) => {
    const day = e.target;
    const date = day.dataset.date;

    if (!date) return;

    if (openedDates.has(date)) {
      showPopup("Denne luka er allerede åpnet!");
      return;
    }

    openedDates.add(date);
    localStorage.setItem(
      "openedDates",
      JSON.stringify(Array.from(openedDates))
    );
    day.classList.add("opened");

    openSound.play(); // Play sound when a door is opened

    const message = customMessages[date] || (await fetchJoke());
    showPopup(message);
  });

  // Vis popup
  function showPopup(message) {
    popupContent.textContent = message;
    popup.classList.remove("hidden");
  }

  // Lukk popup
  popupClose.addEventListener("click", () => {
    popup.classList.add("hidden");
  });

  // Tilbakestill kalender
  resetButton.addEventListener("click", () => {
    openedDates.clear();
    localStorage.removeItem("openedDates");
    localStorage.removeItem("customMessages");
    Array.from(calendarGrid.children).forEach((day) =>
      day.classList.remove("opened")
    );
  });

  // Legg til custom melding
  addMessageButton.addEventListener("click", () => {
    const date = customDate.value;
    const text = customText.value;

    if (!date || !text || date < 1 || date > 24) {
      showPopup("Ugyldig dato eller melding!");
      return;
    }

    customMessages[date] = text;
    localStorage.setItem("customMessages", JSON.stringify(customMessages));
    showPopup(`Melding lagt til for dato ${date}`);
  });
});
