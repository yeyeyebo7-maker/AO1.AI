import type { WslOpencodeCheck, WslServerRuntime } from "./types"

export const wslRuntimeRetryable = (runtime: WslServerRuntime) =>
  runtime.kind === "failed" || runtime.kind === "stopped"

export async function enterWslAo1Step(
  distro: string,
  probe: (distro: string) => Promise<unknown>,
  select: (step: "ao1") => void,
) {
  await probe(distro)
  select("ao1")
}

export function wslAo1Action(check?: WslOpencodeCheck) {
  if (!check) return
  if (!check.resolvedPath) return "Install AO1"
  if (check.matchesDesktop === false) return "Update AO1"
}
