export function apiFetch(path, options = {}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  const url = path.startsWith("/")
    ? `${baseUrl}${path}`
    : `${baseUrl}/${path}`;

  return fetch(url, {
    // Defaults
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    cache: options.cache ?? "force-cache", // Next.js default
    next: options.next, // supports { revalidate: 5 }
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
}
