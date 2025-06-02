# Loans App

This project consists of a loan application system with a React frontend and Node.js backend. Users can fill out a loan application form, and the system will display loan offers from various lenders.

![App Demo](./appDemo.gif)

## Project Structure

The project is divided into two main parts:

- `loans-app-ui`: React frontend built with TypeScript, Vite, and Material UI
- `loans-app-api`: Node.js backend built with Express and TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Running the Backend (API)

1. Navigate to the API directory:

```bash
   cd loans-app-api
```

2. Install dependencies

```bash
  npm install
```

3. Start the development server:

```bash
  npm run dev
```

The API will run on http://localhost:3000

### Running the Frontend (UI)

1. Navigate to the UI directory

```bash
  cd loans-app-ui
```

2. Install dependencies

```bash
npm install
```

3. Setup env by creating an .env file based from the .env.sample.

```
VITE_API_URL=http://localhost:3000/api
```

4. Start the development server:

```bash
npm run dev
```

The UI will run on [http://localhost:5173](http://localhost:5173)

## Features

- Multi-step loan application form
- Form validation with Yup
- API integration for loan offers
- E2E testing with Cypress

# Testing

With the app running on the side, run Cypress tests with

```bash
cd loans-app-ui
npm run cy:open
```

## Project Details

### Frontend Tech Stack

- React 18
- Typescript
- Material UI
- React Hook Form
- Vite
- React Query
- Cypress for testing

### Backend Tech Stack

- Node.js
- Express
- Typescript
- Yup for validation
- Helmet
