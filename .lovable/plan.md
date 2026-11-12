# Deployment auf Debian 12 (GitHub → Node → nginx)

Annahme: Die App läuft intern auf Port 8080, nginx nimmt Anfragen auf Port 80/443 für heizoel-austria.at an und leitet sie an 8080 weiter. Am Projekt selbst muss nichts geändert werden.

## 1. Pakete installieren
```bash
sudo apt update && sudo apt install -y git curl unzip nginx certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
curl -fsSL https://bun.sh/install | bash && source ~/.bashrc
```

## 2. Code von GitHub holen und bauen
```bash
sudo mkdir -p /var/www && sudo chown $USER /var/www && cd /var/www
git clone https://github.com/DEIN-USER/DEIN-REPO.git heizoel && cd heizoel
bun install
NITRO_PRESET=node-server bun run build
```
Wichtig: `NITRO_PRESET=node-server`, sonst wird für Cloudflare gebaut. Ergebnis: `.output/server/index.mjs`.

Test: `PORT=8080 node .output/server/index.mjs` → `curl localhost:8080`

## 3. Dauerhaft als Dienst (systemd)
```bash
sudo tee /etc/systemd/system/heizoel.service >/dev/null <<'UNIT'
[Unit]
Description=Heizoel Austria
After=network.target
[Service]
WorkingDirectory=/var/www/heizoel
ExecStart=/usr/bin/node .output/server/index.mjs
Environment=PORT=8080
Environment=HOST=127.0.0.1
Environment=NODE_ENV=production
Restart=always
User=www-data
[Install]
WantedBy=multi-user.target
UNIT
sudo chown -R www-data /var/www/heizoel
sudo systemctl daemon-reload && sudo systemctl enable --now heizoel
```

## 4. nginx
```bash
sudo tee /etc/nginx/sites-available/heizoel >/dev/null <<'NGX'
server {
    listen 80;
    server_name heizoel-austria.at www.heizoel-austria.at;
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGX
sudo ln -s /etc/nginx/sites-available/heizoel /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

## 5. HTTPS (DNS-A-Record muss auf den Server zeigen)
```bash
sudo certbot --nginx -d heizoel-austria.at -d www.heizoel-austria.at
```

## 6. Updates später
```bash
cd /var/www/heizoel && sudo -u www-data git pull
sudo -u www-data env NITRO_PRESET=node-server bun run build
sudo systemctl restart heizoel
```

## Hinweise
- Soll nginx selbst auf Port 8080 lauschen: `listen 8080;` setzen und die App auf z. B. `PORT=3000` (Service + proxy_pass anpassen).
- Bestellungen laufen weiter über das externe Panel; dafür sind keine Server-Secrets nötig.
- Logs: `journalctl -u heizoel -f`
