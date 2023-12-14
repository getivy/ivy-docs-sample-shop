# Ivy Docs Sample Shop

## Description

This project is a full-stack application that includes a client and a server. The client is built with Vite and the server is built with Express.js.
The application allows users to play around and see how you can setup the Ivy API.

## Installation

To install the dependencies for this project, navigate to both the `client` and `server` directories in your terminal and run:

```bash
yarn
```

## Running the Application

To start the `client`, navigate to the client directory in your terminal and run:

```bash
yarn dev
```

To start the `server`, navigate to the server directory in your terminal and run:

```bash
yarn start
```

### Docker

This project includes a `docker-compose.yml` file that allows you to run the `client` and `server` in Docker containers. To start the containers, run:

```bash
docker-compose up
```

## Environment Variables

This project uses the following environment variables:

`IVY_API_URL`: The URL of the Ivy API. <br>
`PORT`: The port the server should run on. <br>
`IVY_API_KEY`: The API key for the Ivy API.

Copy the .env.example file to .env, then fill out IVY_API_KEY in .env

```bash
cp .env.example .env
```

Make sure to have a merchant correctly created to obtain your environment vars. [Contact us](mailto:developer@getivy.io?subject=Merchant%20Dashboard%20Access) if needed.

## Docs

For more information, see our Docs at https://docs.getivy.de/
