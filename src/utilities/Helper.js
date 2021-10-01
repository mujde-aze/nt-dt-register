export function retrieveSocialNetworkSource(url) {
  if (url.includes("google")) {
    return "google";
  }

  if (url.includes("facebook")) {
    return "facebook";
  }

  if (url.includes("tiktok")) {
    return "tiktok";
  }

  return "unknown";
}
