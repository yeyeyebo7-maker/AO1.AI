import type { WslDistroProbe, WslOpencodeCheck, WslServerItem } from "../../preload/types"

export function wslServerIdToRestart(servers: WslServerItem[], distro: string) {
  return servers.find((item) => item.config.distro === distro)?.config.id
}

export function clearWslDistroState(
  distroProbes: Record<string, WslDistroProbe>,
  ao1Checks: Record<string, WslOpencodeCheck>,
  distro: string,
) {
  const nextDistroProbes = { ...distroProbes }
  const nextAo1Checks = { ...ao1Checks }
  delete nextDistroProbes[distro]
  delete nextAo1Checks[distro]
  return { distroProbes: nextDistroProbes, ao1Checks: nextAo1Checks }
}

export function wslTerminalArgs(distro?: string | null) {
  return ["/c", "start", "", "wsl", ...(distro ? ["-d", distro] : [])]
}

export function requireWslIpcString(name: string, value: unknown) {
  if (typeof value === "string" && value.length > 0) return value
  throw new Error(`Invalid ${name}`)
}
