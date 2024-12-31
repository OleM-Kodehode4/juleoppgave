# Christmas Calendar Interactive Application

## Overview
This project is an interactive Christmas calendar that allows users to click on dates (1-24) to reveal a "luke" containing a random Christmas fact or joke. The calendar is designed with a festive theme and includes features for user interaction.

## Project Structure
```
christmas-calendar
├── src
│   ├── index.html       # HTML structure for the calendar
│   ├── styles.css       # CSS styles for the calendar
│   └── app.js           # JavaScript logic for interactivity
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

## Features
- 5x5 grid layout representing the days of December leading up to Christmas.
- Each cell displays a number from 1 to 24.
- Clicking on a date fetches a random joke or fact from an API.
- Once a date is opened, it cannot be opened again.
- Reset button to allow users to start over.
- Users can add their own Christmas messages for any date.

## Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd christmas-calendar
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Running the Application
1. Open `src/index.html` in your web browser to view the calendar.
2. Click on any date to reveal the content.

## Contributing
Feel free to submit issues or pull requests for any enhancements or bug fixes.

## License
This project is open-source and available under the MIT License.