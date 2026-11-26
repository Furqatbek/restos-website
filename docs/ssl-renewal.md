# HTTPS certificates (Let's Encrypt)

Two certificates live on the host in `/etc/letsencrypt` and are mounted into
the nginx container read-only:

- `restos.uz` (also covers `www.restos.uz`)
- `bot.restos.uz`

They last 90 days. Renewal uses the **webroot** method: certbot on the host
writes a challenge file into `/var/www/certbot`, which nginx serves at
`http://<domain>/.well-known/acme-challenge/` (both port-80 server blocks in
`nginx/restos.conf`). nginx keeps running; after a renewal a deploy hook
reloads it so it picks up the new files.

On 2026-11-26 both certificates expired because nothing renewed them: the
challenge folder was a Docker named volume certbot could not reach.

## One-time setup on the server

```bash
mkdir -p /var/www/certbot
cd /opt/restos && git pull && docker compose up -d     # nginx now mounts /var/www/certbot

# Renew with webroot from now on (saved in /etc/letsencrypt/renewal/*.conf)
certbot reconfigure --cert-name restos.uz     --webroot -w /var/www/certbot
certbot reconfigure --cert-name bot.restos.uz --webroot -w /var/www/certbot

# Reload nginx whenever a certificate is renewed
cat > /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh <<'HOOK'
#!/bin/sh
docker exec restos-nginx-1 nginx -s reload
HOOK
chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh

# Prove it works without touching the real certificates
certbot renew --dry-run

# The certbot package runs renewal twice a day; confirm the timer is on
systemctl list-timers | grep certbot
```

`certbot reconfigure` needs certbot 2.3 or newer (`certbot --version`). On an
older version, edit `/etc/letsencrypt/renewal/<name>.conf`: set
`authenticator = webroot` and add a `[[webroot_map]]` section mapping each
domain to `/var/www/certbot`.

## Check expiry

```bash
certbot certificates
```
