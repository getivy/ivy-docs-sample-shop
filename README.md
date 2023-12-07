# Ivy Docs Sample Shop

## Description

This project is a full-stack application that includes a client and a server. The client is built with Vite and the server is built with Express.js.
The application allows users to play around and see how you can setup the Ivy API.

## Installation

To install the dependencies for this project, navigate to both the `client` and `server` directories in your terminal and run:

```bash
npm install
```

## Running the Application

To start the client, navigate to the client directory in your terminal and run:

```bash
npm run dev
```

To start the server, navigate to the server directory in your terminal and run:

```bash
npm run start
```

### Docker

This project includes a docker-compose.yml file that allows you to run the client and server in Docker containers. To start the containers, run:

```bash
make up
```

## Environment Variables

This project uses the following environment variables:

IVY_API_URL: The URL of the Ivy API.
PORT: The port the server should run on.
IVY_API_KEY: The API key for the Ivy API.
