# Ivy Sample Shop Client
This is the client side of the Ivy Sample Shop application. It is built with React, TypeScript, and Vite.

## Installation
Before you start, make sure you have Node.js and Yarn installed on your machine.

To install the dependencies for the client, navigate to the client directory in your terminal and run:

``` bash
yarn
```

## Running the Application
To start the client, navigate to the client directory in your terminal and run:

``` bash
yarn dev
```

The client will start and by default it will be available at http://localhost:5173.

## Building the Application
To build the client for production, run:

``` bash
yarn build
```

build
This will create a `dist` directory with the built assets.

## Docker
This project includes a Dockerfile that allows you to run the client in a Docker container. To build and start the container, navigate to the client directory in your terminal and run:

``` bash
docker build -t ivy-client-sample .
docker run -p 5173:5173 ivy-client-sample
```

## Linting
To lint the code, run:

``` bash
yarn lint
```

This will run ESLint on the TypeScript files in the project.
