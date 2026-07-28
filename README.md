

https://github.com/user-attachments/assets/1c5a1bb4-6fdd-41e2-9ea1-74f9e21c6947

# Flight Tracker

A real-time flight tracking web application built with React. It displays live aircraft positions on an interactive map, differentiating between airplanes and helicopters, and supports user authentication with role-based access.

## Features

- Real-time flight data streaming via WebSocket (STOMP protocol)
- Interactive map with airplane and helicopter markers
- Flight detail popups (flight number, altitude, speed)
- Map boundary-based filtering — only flights within the current view are streamed
- User authentication (Login / Sign Up)
- Role-based access control
- Responsive UI with sidebar and bottom menu

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Map | Leaflet, React-Leaflet |
| Real-time | STOMP.js, SockJS (WebSocket) |
| UI Components | Material UI (MUI v6) |
| Routing | React Router DOM v6 |
| Date Handling | Day.js, date-fns |
| Containerization | Docker, Nginx (multi-stage build) |
| Orchestration | Docker Compose |

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & Run

```bash
npm install
npm start
```

App runs at [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env` file in the project root:

```env
REACT_APP_BASE_URL=http://your-backend-url
```

## Docker

Build and run with Docker Compose:

```bash
docker compose up --build
```

The app will be served by Nginx on port `3000`.

## Project Structure

```
src/
├── components/
│   ├── Map/          # Map view, flight markers
│   ├── Login/        # Login page
│   ├── SignUp/       # Sign up page
│   ├── Navbar/       # Top navigation bar
│   ├── Sidebar/      # Flight filter sidebar
│   ├── BottomMenu/   # Bottom action menu
│   └── CustomModal/  # Reusable modal component
├── contexts/         # App-wide state (AppContext)
├── models/           # TypeScript interfaces
├── services/         # WebSocket / flight data service
└── styles/           # Global CSS
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
