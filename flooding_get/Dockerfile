# Use an official image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the client files into the container
COPY /src .

# Set environment variables to allow the client to connect to the server running on localhost at port 8000
ENV port=8000
ENV ip=localhost
ENV trials=100
# Start the client
CMD [ "sh", "-c", "node client.js ${ip} ${port} {trials}"]
