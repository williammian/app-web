FROM nginx:alpine
COPY /dist/app-web /etc/nginx/html
COPY localhost.crt /etc/nginx/localhost.crt
COPY localhost.key /etc/nginx/localhost.key
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["/bin/sh",  "-c",  "envsubst < /etc/nginx/html/assets/env/env.template.js > /etc/nginx/html/assets/env/env.js && exec nginx -g 'daemon off;'"]
