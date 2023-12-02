# Pratilipi User Service

This is the README file for the Pratilipi user Service. This service is designed to provide user-related functionality.

## Prerequisites

Before you can build and run the Pratilipi user Service, make sure you have the following tools installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (for running the application locally)

## Getting Started

Follow the steps below to build and run the Pratilipi user Service using Docker:

1. **Build the Docker Image:**

    Use the following command to build a Docker image of the service:

    ```bash
    npm run docker:build
    ```

    OR

    ```bash
    docker build . -t prateekbaranwal/pratilipi:0.0.1
    ```


2. **Run the Docker Container:**

    After successfully building the Docker image, you can run a container with the following command:

    ```bash
    npm run docker:run
    ```

    OR

    ```bash
    docker rm -f pratilipi:0.0.1 && docker run -p 3000:3000 --name user -d prateekbaranwal/pratilipi:0.0.1
    ```

    This will start a Docker container named `user` and map port 3000 inside the container to port 3000 on your host machine.

3. **Access the Service:**

    Once the container is up and running, you can access the Pratilipi user Service at [http://localhost:3000](http://localhost:3000).

4. **Stopping the Container:**

    To stop the running Docker container, use the following command:

    ```bash
    docker stop user
    ```

    To remove the user Docker container, use the following command:

    ```bash
    docker remove user
    ```

## API Documentation

For information about the available API endpoints and their usage, please refer to the Swagger documentation provided.

Once the container is up and running, you can access the Pratilipi user Swagger documentation at [http://localhost:3000/docs](http://localhost:3000/docs).

