declare global {
  const AO1_VERSION: string
  const AO1_CHANNEL: string
}

export const InstallationVersion = typeof AO1_VERSION === "string" ? AO1_VERSION : "local"
export const InstallationChannel = typeof AO1_CHANNEL === "string" ? AO1_CHANNEL : "local"
export const InstallationLocal = InstallationChannel === "local"
