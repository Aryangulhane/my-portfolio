# Portfolio Project

This repository contains the source code for my portfolio, consisting of a Next.js frontend and a Sanity backend.

## Project Structure

The project has been structured into two main directories:

- `/frontend`: Contains the Next.js application (React, Tailwind CSS, etc.).
- `/backend`: Contains the Sanity Studio configuration and schemas.

## Getting Started

From the root directory, you can run the following scripts to manage both applications:

### Install Dependencies
```bash
npm run install:all
```

### Run Frontend Development Server
```bash
npm run dev:frontend
```
The Next.js application will be available at [http://localhost:3000](http://localhost:3000).

### Run Backend (Sanity Studio) Development Server
```bash
npm run dev:backend
```
The Sanity Studio will be available at [http://localhost:3333](http://localhost:3333).

### Build for Production
```bash
npm run build:frontend
npm run build:backend
```

## Deployment
- **Frontend**: Deploy the `frontend` directory directly to Vercel. Make sure to set the Root Directory to `frontend` in your Vercel project settings.
- **Backend**: Deploy the `backend` directory using Sanity's deployment commands (`cd backend && npx sanity deploy`).
