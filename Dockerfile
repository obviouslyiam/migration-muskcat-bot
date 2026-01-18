FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY index.html /usr/share/caddy/index.html
COPY styles.css /usr/share/caddy/styles.css
COPY script.js /usr/share/caddy/script.js
COPY assets /usr/share/caddy/assets

EXPOSE 80
EXPOSE 443
