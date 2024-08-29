#!/bin/bash

# Build the Docker image
docker build -t ricoharsono/huatah:latest . || { echo "Docker build failed"; exit 1; }

# Push the Docker image to Docker Hub
docker push ricoharsono/huatah:latest || { echo "Docker push failed"; exit 1; }

# Restart Kubernetes deployment
CHECKCONTEXT=$(kubectl config current-context | grep do-sgp1-k8s)

if [ -z "$CHECKCONTEXT" ]; then
    echo "Current context is not correct. Exiting."
    exit 1
else
    kubectl rollout restart deployment huatah-deployment || { echo "Kubernetes rollout restart failed"; exit 1; }
fi
