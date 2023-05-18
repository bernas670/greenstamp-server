# GreenStamp API
This API allows users to upload files to the server. The API is packaged as a Docker container for easy deployment.

## Getting Started
These instructions will get you the API up and running in a Docker container.

### Prerequisites
 - Docker 19.x or later

### Running the API in a Docker container
1. Build docker image from the `Dockerfile`:
    ```
    docker build -t greenstamp-server .
    ```
2. Run the docker container and map the ports:
    ```
    docker run -p <device_port_http>:80 -p <device_port_https>:443 -v <certificates_path>:/certificates:r greenstamp-server
    ```

This will start the API in a Docker container and expose it on port `<device_port>` on the host machine.

## Usage

To upload a file, send a `POST` request to the `/upload` route with the file data in the request body. The file should be sent as a `form-data` request with the key `file`.

Here is an example of how to upload a file using cURL, if you use port `8080`:
```
curl -X POST \
  http://localhost:8080/upload \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@/path/to/file.pdf'
```
The API will save the file to the `uploads/` directory on the server, and return a `200 OK` response with the message `File saved!`.

## Built With

- [Express.js](https://expressjs.com/) - The web framework used
- [multer](https://www.npmjs.com/package/multer) - The middleware used for file uploads

