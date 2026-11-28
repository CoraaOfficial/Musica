# Guida rapida: Backup Online Hush (Cloudflare R2 + Worker gratis)

1. Vai su [dash.cloudflare.com](https://dash.cloudflare.com) e crea un account gratuito.
2. Nel menu a sinistra vai su **R2 Object Storage** → **Create bucket**, chiamalo `hush-backups`.
3. Entra nel bucket `hush-backups` → **Settings** → **Object Lifecycle Rules** → **Add rule**:
   - Nome: `Auto-delete 30 days`
   - Seleziona **Delete objects** dopo **30 giorni**.
4. Nel menu a sinistra vai su **Workers & Pages** → **Create** → **Create Worker**, chiamalo `hush-backup`.
5. Clicca **Edit code**, incolla tutto il contenuto del file `cloudflare-worker.js` di questa cartella e clicca **Deploy**.
6. Vai nelle **Settings** del Worker → **Bindings** → **Add** → **R2 Bucket**:
   - Variable name: `BUCKET`
   - R2 bucket: `hush-backups`
   - Salva e fai **Deploy**.
7. Copia l'URL del tuo Worker (es. `https://hush-backup.tuonome.workers.dev`) e incollalo in **Hush → Impostazioni → Backup → URL Server Backup**.
