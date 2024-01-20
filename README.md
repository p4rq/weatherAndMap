# Weather Information App

This web application provides weather information for a given city. It includes features such as displaying current weather details, country information, and time zone details. The application also utilizes geolocation to show the user's current location on the map.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [API Usage](#api-usage)
- [Key Design Decisions](#key-design-decisions)
- [Technologies Used](#technologies-used)


## Features

- Display current weather information for a specified city.
- Show country details based on the provided weather information.
- Present time zone information for the given location.
- Interactive map displaying the user's current location.

## Project Structure

```
/your_project
├── public
│   ├── weather.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/p4rq/weatherAndMap.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd weatherAndMap
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

## Usage

1. **Run the server:**

   ```bash
   node server.js
   ```

2. **Open a web browser and visit [http://localhost:3000](http://localhost:3000).**

3. **Enter the desired city in the search box and click "Search Weather" to get information.**

### API Usage

- The API endpoint for weather information is `/api/weather/:city`.
- Replace `:city` with the desired city name.
- The server fetches weather data from the OpenWeatherMap API.

```javascript
// Example API usage in script.js
fetch('/api/weather/London')
  .then(response => response.json())
  .then(data => {
    // Handle data and update UI
  })
  .catch(error => console.error('Error:', error));
```

## Key Design Decisions

- **Server-Side Logic:**
  - The core logic for fetching weather data and handling API requests is implemented in `server.js` to separate concerns and keep the HTML file clean.

- **Front-End Frameworks:**
  - The application uses minimal front-end frameworks to keep it lightweight and easy to understand. The main functionality is achieved with pure HTML, CSS, and JavaScript.

- **User Interface Design:**
  - The UI is designed to be simple and user-friendly, with a clean layout and easy navigation.

## Technologies Used

- Node.js
- Express.js
- Axios (for making HTTP requests)
- Leaflet (for interactive maps)
- jQuery
- HTML5, CSS3
