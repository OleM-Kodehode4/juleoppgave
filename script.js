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
  try {
    for (let i = 1; i <= 24; i++) {
      const day = document.createElement("div");
      day.textContent = i;
      day.dataset.date = i;
      if (openedDates.has(i.toString())) {
        day.classList.add("opened");
      }
      calendarGrid.appendChild(day);
    }
  } catch (error) {
    console.error("Feil ved generering av kalender:", error);
  }

  // Hent random joke/fact
  async function fetchJoke() {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await response.json();
      return `${data.setup} - ${data.punchline}`;
    } catch (error) {
      console.error("Feil ved henting av vits:", error);
      return "Kunne ikke hente en vits. Prøv igjen senere!";
    }
  }

  // Håndter klikking på datoer
  calendarGrid.addEventListener("click", async (e) => {
    try {
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
    } catch (error) {
      console.error("Feil ved håndtering av klikk på dato:", error);
    }
  });

  // Vis popup
  function showPopup(message) {
    try {
      popupContent.textContent = message;
      popup.classList.remove("hidden");
    } catch (error) {
      console.error("Feil ved visning av popup:", error);
    }
  }

  // Lukk popup
  popupClose.addEventListener("click", () => {
    try {
      popup.classList.add("hidden");
    } catch (error) {
      console.error("Feil ved lukking av popup:", error);
    }
  });

  // Tilbakestill kalender
  resetButton.addEventListener("click", () => {
    try {
      openedDates.clear();
      localStorage.removeItem("openedDates");
      localStorage.removeItem("customMessages");
      Array.from(calendarGrid.children).forEach((day) =>
        day.classList.remove("opened")
      );
    } catch (error) {
      console.error("Feil ved tilbakestilling av kalender:", error);
    }
  });

  // Legg til custom melding
  addMessageButton.addEventListener("click", () => {
    try {
      const date = customDate.value;
      const text = customText.value;

      if (!date || !text || date < 1 || date > 24) {
        showPopup("Ugyldig dato eller melding!");
        return;
      }

      customMessages[date] = text;
      localStorage.setItem("customMessages", JSON.stringify(customMessages));
      showPopup(`Melding lagt til for dato ${date}`);
    } catch (error) {
      console.error("Feil ved legging til av custom melding:", error);
    }
  });
});
