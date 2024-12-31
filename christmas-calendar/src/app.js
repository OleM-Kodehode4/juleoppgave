const calendarDays = Array.from({ length: 24 }, (_, i) => i + 1);
const openedDays = new Set();
const apiUrl = 'https://api.jokes.one/jod'; // Example API for jokes

document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendar');
    const messageContainer = document.getElementById('message');
    const resetButton = document.getElementById('reset');

    // Create calendar grid
    calendarDays.forEach(day => {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day');
        dayCell.textContent = day;
        dayCell.addEventListener('click', () => openDoor(day));
        calendarContainer.appendChild(dayCell);
    });

    // Function to open a door
    function openDoor(day) {
        if (openedDays.has(day)) {
            alert('Denne luka er allerede åpnet!');
            return;
        }
        openedDays.add(day);
        fetchJokeOrFact(day);
    }

    // Fetch joke or fact from API
    function fetchJokeOrFact(day) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const joke = data.contents.jokes[0].joke.text;
                displayMessage(day, joke);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Display message in the calendar or popup
    function displayMessage(day, message) {
        const dayCells = document.querySelectorAll('.day');
        dayCells[day - 1].classList.add('opened');
        messageContainer.textContent = `Luka ${day}: ${message}`;
    }

    // Reset calendar
    resetButton.addEventListener('click', () => {
        openedDays.clear();
        document.querySelectorAll('.day').forEach(cell => {
            cell.classList.remove('opened');
        });
        messageContainer.textContent = '';
    });
});