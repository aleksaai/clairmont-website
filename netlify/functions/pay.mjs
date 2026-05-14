// Netlify Function — proxies /pay to the Supabase payment-portal edge function.
//
// Why this isn't a plain _redirects rule:
// Netlify wraps cross-origin `200!` proxies in a strict Content-Security-Policy
// (`default-src 'none'; sandbox`) AND rewrites the upstream `Content-Type`
// to `text/plain`. The browser then refuses to render the HTML.
// This thin function passes both directions through with the original headers
// preserved so the page renders correctly.

export const handler = async (event) => {
  const target = "https://ufnxliieaejdvxcanqux.supabase.co/functions/v1/payment-portal";
  const url = event.rawQuery ? `${target}?${event.rawQuery}` : target;

  const upstream = await fetch(url, {
    method: event.httpMethod,
    headers: {
      "Content-Type": event.headers["content-type"] ?? "application/json",
    },
    body: ["GET", "HEAD"].includes(event.httpMethod) ? undefined : event.body,
  });

  const body = await upstream.text();
  // Server-to-server fetches to Supabase Edge Functions return `text/plain`
  // (no Accept header negotiation). For our portal that's wrong — the GET
  // path is HTML, the POST path is JSON. We force the right MIME based on
  // body content rather than trusting upstream.
  const looksLikeJson = body.trimStart().startsWith("{") || body.trimStart().startsWith("[");
  const contentType = looksLikeJson ? "application/json; charset=utf-8" : "text/html; charset=utf-8";

  return {
    statusCode: upstream.status,
    headers: {
      "content-type": contentType,
      "cache-control": "no-store",
    },
    body,
  };
};
