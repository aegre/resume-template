export function getProfileUrl(
  profiles: Array<{ network?: string; url?: string }> | undefined,
  network: string
): string | undefined {
  return profiles?.find(
    (profile) => profile.network?.toLowerCase() === network.toLowerCase()
  )?.url
}
