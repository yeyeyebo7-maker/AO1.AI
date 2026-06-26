import { Config } from "effect"

export function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

const copy = process.env["AO1_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]
const fff = process.env["AO1_DISABLE_FFF"]

function enabledByExperimental(key: string) {
  return process.env[key] === undefined ? truthy("AO1_EXPERIMENTAL") : truthy(key)
}

export const Flag = {
  OTEL_EXPORTER_OTLP_ENDPOINT: process.env["OTEL_EXPORTER_OTLP_ENDPOINT"],
  OTEL_EXPORTER_OTLP_HEADERS: process.env["OTEL_EXPORTER_OTLP_HEADERS"],

  AO1_AUTO_HEAP_SNAPSHOT: truthy("AO1_AUTO_HEAP_SNAPSHOT"),
  AO1_GIT_BASH_PATH: process.env["AO1_GIT_BASH_PATH"],
  AO1_CONFIG: process.env["AO1_CONFIG"],
  AO1_CONFIG_CONTENT: process.env["AO1_CONFIG_CONTENT"],
  AO1_DISABLE_AUTOUPDATE: truthy("AO1_DISABLE_AUTOUPDATE"),
  AO1_ALWAYS_NOTIFY_UPDATE: truthy("AO1_ALWAYS_NOTIFY_UPDATE"),
  AO1_DISABLE_PRUNE: truthy("AO1_DISABLE_PRUNE"),
  AO1_DISABLE_TERMINAL_TITLE: truthy("AO1_DISABLE_TERMINAL_TITLE"),
  AO1_SHOW_TTFD: truthy("AO1_SHOW_TTFD"),
  AO1_DISABLE_AUTOCOMPACT: truthy("AO1_DISABLE_AUTOCOMPACT"),
  AO1_DISABLE_MODELS_FETCH: truthy("AO1_DISABLE_MODELS_FETCH"),
  AO1_DISABLE_MOUSE: truthy("AO1_DISABLE_MOUSE"),
  AO1_FAKE_VCS: process.env["AO1_FAKE_VCS"],
  AO1_SERVER_PASSWORD: process.env["AO1_SERVER_PASSWORD"],
  AO1_SERVER_USERNAME: process.env["AO1_SERVER_USERNAME"],
  AO1_DISABLE_FFF: fff === undefined ? process.platform === "win32" : truthy("AO1_DISABLE_FFF"),

  // Experimental
  AO1_EXPERIMENTAL_FILEWATCHER: Config.boolean("AO1_EXPERIMENTAL_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  AO1_EXPERIMENTAL_DISABLE_FILEWATCHER: Config.boolean("AO1_EXPERIMENTAL_DISABLE_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  AO1_EXPERIMENTAL_DISABLE_COPY_ON_SELECT:
    copy === undefined ? process.platform === "win32" : truthy("AO1_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"),
  AO1_MODELS_URL: process.env["AO1_MODELS_URL"],
  AO1_MODELS_PATH: process.env["AO1_MODELS_PATH"],
  AO1_DB: process.env["AO1_DB"],

  AO1_WORKSPACE_ID: process.env["AO1_WORKSPACE_ID"],
  AO1_EXPERIMENTAL_WORKSPACES: enabledByExperimental("AO1_EXPERIMENTAL_WORKSPACES"),

  // Evaluated at access time (not module load) because tests, the CLI, and
  // external tooling set these env vars at runtime.
  get AO1_DISABLE_PROJECT_CONFIG() {
    return truthy("AO1_DISABLE_PROJECT_CONFIG")
  },
  get AO1_EXPERIMENTAL_REFERENCES() {
    return enabledByExperimental("AO1_EXPERIMENTAL_REFERENCES")
  },
  get AO1_TUI_CONFIG() {
    return process.env["AO1_TUI_CONFIG"]
  },
  get AO1_CONFIG_DIR() {
    return process.env["AO1_CONFIG_DIR"]
  },
  get AO1_PURE() {
    return truthy("AO1_PURE")
  },
  get AO1_PERMISSION() {
    return process.env["AO1_PERMISSION"]
  },
  get AO1_PLUGIN_META_FILE() {
    return process.env["AO1_PLUGIN_META_FILE"]
  },
  get AO1_CLIENT() {
    return process.env["AO1_CLIENT"] ?? "cli"
  },
}
