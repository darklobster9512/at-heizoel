# Update auf dem Server reparieren (keine Änderung an der Website)

## Ursache
- **„env: 'bun': No such file or directory“**: Bun wurde für `root` installiert (unter `/root/.bun`). Der Benutzer `www-data` findet es deshalb nicht.
- **„Already up to date“**: Auf GitHub gibt es noch nichts Neues. Die neue Meta-Pixel-ID landet erst nach dem nächsten Sync auf GitHub (z. B. nach dem Veröffentlichen bzw. wenn der GitHub-Abgleich gelaufen ist).

## Lösung: Bun für alle Benutzer installieren (einmalig, als root)
```bash
curl -fsSL https://bun.sh/install | BUN_INSTALL=/usr/local bash
bun --version
sudo -u www-data bun --version
```
Danach liegt Bun unter `/usr/local/bin/bun` und funktioniert auch für `www-data`.

## Ab dann: Update-Befehle
```bash
cd /var/www/heizoel
sudo -u www-data git pull
sudo -u www-data bun install
sudo -u www-data env NITRO_PRESET=node-server bun run build
sudo systemctl restart heizoel
sudo systemctl status heizoel --no-pager
```

## Falls der Dienst ebenfalls Bun benutzt
Mit `systemctl cat heizoel` prüfen: Steht dort `/root/.bun/bin/bun`, auf `/usr/local/bin/bun` ändern, dann:
```bash
sudo systemctl daemon-reload && sudo systemctl restart heizoel
```

Am Code der Website ändert sich nichts.
