# Pratilipi Content Service

This is the README file for the Pratilipi Content Service. This service is designed to provide content-related functionality.

## Prerequisites

Before you can build and run the Pratilipi Content Service, make sure you have the following tools installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (for running the application locally)

## Getting Started

Follow the steps below to build and run the Pratilipi Content Service using Docker:

1. **Build the Docker Image:**

    Use the following command to build a Docker image of the service:

    ```bash
    npm run docker:build
    ```

    OR

    ```bash
    docker build . -t prateekbaranwal/pratilipi-content:0.0.1
    ```


2. **Run the Docker Container:**

    After successfully building the Docker image, you can run a container with the following command:

    ```bash
    npm run docker:run
    ```

    OR

    ```bash
    docker rm -f pratilipi-content:0.0.1 && docker run -p 3001:3001 --name content -d prateekbaranwal/pratilipi-content:0.0.1
    ```

    This will start a Docker container named `content` and map port 3001 inside the container to port 3001 on your host machine.

3. **Access the Service:**

    Once the container is up and running, you can access the Pratilipi Content Service at [http://localhost:3001](http://localhost:3001).

4. **Stopping the Container:**

    To stop the running Docker container, use the following command:

    ```bash
    docker stop content
    ```

    To remove the content Docker container, use the following command:

    ```bash
    docker remove content
    ```

## API Documentation

For information about the available API endpoints and their usage, please refer to the Swagger documentation provided.

Once the container is up and running, you can access the Pratilipi Content Swagger documentation at [http://localhost:3001/docs](http://localhost:3001/docs).

