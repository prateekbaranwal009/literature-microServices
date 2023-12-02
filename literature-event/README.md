# Pratilipi Event Service

This is the README file for the Pratilipi Event Service. This service is designed to provide event-related functionality.

## Prerequisites

Before you can build and run the Pratilipi Event Service, make sure you have the following tools installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (for running the application locally)

## Getting Started

Follow the steps below to build and run the Pratilipi Event Service using npm or Docker:

1. **Build the Docker Image:**

    Use the following command to build a Docker image of the service:

    ```bash
    npm run docker:build
    ```

    OR

    ```bash
    docker build . -t prateekbaranwal/pratilipi-event:0.0.1
    ```


2. **Run the Docker Container:**

    After successfully building the Docker image, you can run a container with the following command:

    ```bash
    npm run docker:run
    ```

    OR

    ```bash
    docker rm -f pratilipi-event:0.0.1 && docker run -p 3002:3002 -v $(pwd)://pratilipi/event --name event -d prateekbaranwal/pratilipi-event:0.0.1
    ```

    This will start a Docker container named `event` and map port 3002 inside the container to port 3002 on your host machine.

3. **Access the Service:**

    Once the container is up and running, you can access the Pratilipi event Service at [http://localhost:3002](http://localhost:3002).

4. **Stopping the Container:**

    To stop the running Docker container, use the following command:

    ```bash
    docker stop event
    ```

    To remove the event Docker container, use the following command:

    ```bash
    docker remove event
    ```

## API Documentation

For information about the available API endpoints and their usage, please refer to the Swagger documentation provided.

Once the container is up and running, you can access the Pratilipi event Swagger documentation at [http://localhost:3002/docs](http://localhost:3002/docs).

