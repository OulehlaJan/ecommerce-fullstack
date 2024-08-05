#!/bin/sh

# Start Nginx
nginx -g 'daemon off;' -c $PWD/nginx/nginx.conf &

# Start Strapi
cd server && npm start &

# Start React
cd client && npm start
