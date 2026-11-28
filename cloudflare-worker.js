// Cloudflare Worker per Backup Online Hush (con R2 Bucket "BUCKET")
// Imposta una Lifecycle Rule sul bucket R2 per eliminare i file dopo 30 giorni.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const action = parts[0];
    const key = parts[1];
    const file = parts.slice(2).join("/");

    if (!key || !/^[a-f0-9]{32,64}$/i.test(key)) {
      return new Response("Chiave backup non valida", { status: 400, headers: CORS });
    }

    const prefix = `backups/${key}/`;

    if (request.method === "PUT" && action === "upload" && file) {
      await env.BUCKET.put(prefix + file, request.body, {
        httpMetadata: { contentType: request.headers.get("Content-Type") || "application/octet-stream" }
      });
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...CORS, "Content-Type": "application/json" }
      });
    }

    if (request.method === "GET" && action === "list") {
      const listed = await env.BUCKET.list({ prefix });
      const files = listed.objects.map(o => ({
        name: o.key.slice(prefix.length),
        size: o.size
      }));
      return new Response(JSON.stringify({ files }), {
        headers: { ...CORS, "Content-Type": "application/json" }
      });
    }

    if (request.method === "GET" && action === "download" && file) {
      const obj = await env.BUCKET.get(prefix + file);
      if (!obj) return new Response("Non trovato", { status: 404, headers: CORS });
      const headers = new Headers(CORS);
      obj.writeHttpMetadata(headers);
      return new Response(obj.body, { headers });
    }

    if (request.method === "DELETE" && action === "delete") {
      const listed = await env.BUCKET.list({ prefix });
      await Promise.all(listed.objects.map(o => env.BUCKET.delete(o.key)));
      return new Response(JSON.stringify({ ok: true, deleted: listed.objects.length }), {
        headers: { ...CORS, "Content-Type": "application/json" }
      });
    }

    return new Response("Not found", { status: 404, headers: CORS });
  }
};
