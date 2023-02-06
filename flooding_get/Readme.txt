# Example of composition of container:
docker build -t francesco/flooding_get:1.0

#Example of running container
docker run -e trials=1000 -e ip=192.168.1.1 -e port=8000 name_image