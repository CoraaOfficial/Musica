# Guida Setup Backup Online con Supabase (100% Gratis, Nessuna Carta di Credito)

Supabase offre **1 GB di storage gratuito** (fino a 5 GB su alcuni piani free) senza richiedere alcuna carta di credito.

## 1. Crea un progetto Supabase
1. Vai su [supabase.com](https://supabase.com) e registrati gratis (anche con GitHub o Google).
2. Clicca **New Project**, scegli un nome (es. `hush-backup`), una password per il DB (non ti servirà) e la regione più vicina (es. `West EU (Ireland)` o `Central EU (Frankfurt)`).
3. Attendi 1-2 minuti che il progetto venga creato.

## 2. Crea il Bucket di Storage
1. Nel menu a sinistra clicca **Storage**.
2. Clicca **New bucket**.
3. Nome esatto: `hush-backups`
4. Lascia **Public bucket** disattivato (privato) oppure attivalo se preferisci, poi clicca **Save**.
5. Vai su **Storage → Policies** (o clicca sui tre puntini del bucket `hush-backups` → **Edit** / **Policies**).
6. Aggiungi una policy per permettere all'app di leggere, caricare ed eliminare i file usando l'Anon Key:
   - Clicca **New Policy** → **For full customization**
   - Allowed operations: seleziona **SELECT, INSERT, UPDATE, DELETE**
   - Target roles: `anon`
   - Policy definition (`USING` e `WITH CHECK`): scrivi `true`
   - Salva.

## 3. Copia URL e Anon Key in Hush
1. In Supabase vai su **Project Settings** (icona ingranaggio in basso a sinistra) → **API**.
2. Copia:
   - **Project URL** (es. `https://abcdefghijkl.supabase.co`)
   - **anon public** key (la chiave lunga sotto *Project API keys*)
3. Apri **Hush** su iPhone → **Impostazioni** → **⚙️ Config Supabase** e incolla prima l'URL e poi la chiave.

Fatto! Ora puoi usare **☁️ Backup online**, **📥 Importa backup online** e **🗑️ Elimina backup online** direttamente dall'app.
