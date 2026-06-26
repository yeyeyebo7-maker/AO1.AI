import type { ElectronAPI } from "../preload/types"

declare global {
  interface Window {
    api: ElectronAPI
    __AO1__?: {
      deepLinks?: string[]
    }
  }
}
