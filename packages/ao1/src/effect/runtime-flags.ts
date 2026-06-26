import { Config, ConfigProvider, Context, Effect, Layer, Option } from "effect"
import { ConfigService } from "@/effect/config-service"

const bool = (name: string) => Config.boolean(name).pipe(Config.withDefault(false))
const positiveInteger = (name: string) =>
  Config.number(name).pipe(
    Config.map((value) => (Number.isInteger(value) && value > 0 ? value : undefined)),
    Config.orElse(() => Config.succeed(undefined)),
  )
const experimental = bool("AO1_EXPERIMENTAL")
const enabledByExperimental = (name: string) =>
  Config.all({ experimental, enabled: Config.boolean(name).pipe(Config.option) }).pipe(
    Config.map((flags) => Option.getOrElse(flags.enabled, () => flags.experimental)),
  )

export class Service extends ConfigService.Service<Service>()("@ao1/RuntimeFlags", {
  autoShare: bool("AO1_AUTO_SHARE"),
  pure: bool("AO1_PURE"),
  disableDefaultPlugins: bool("AO1_DISABLE_DEFAULT_PLUGINS"),
  disableEmbeddedWebUi: bool("AO1_DISABLE_EMBEDDED_WEB_UI"),
  disableExternalSkills: bool("AO1_DISABLE_EXTERNAL_SKILLS"),
  disableLspDownload: bool("AO1_DISABLE_LSP_DOWNLOAD"),
  disableClaudeCodePrompt: Config.all({
    broad: bool("AO1_DISABLE_CLAUDE_CODE"),
    direct: bool("AO1_DISABLE_CLAUDE_CODE_PROMPT"),
  }).pipe(Config.map((flags) => flags.broad || flags.direct)),
  disableClaudeCodeSkills: Config.all({
    broad: bool("AO1_DISABLE_CLAUDE_CODE"),
    direct: bool("AO1_DISABLE_CLAUDE_CODE_SKILLS"),
  }).pipe(Config.map((flags) => flags.broad || flags.direct)),
  enableExa: Config.all({
    experimental,
    enabled: bool("AO1_ENABLE_EXA"),
    legacy: bool("AO1_EXPERIMENTAL_EXA"),
  }).pipe(Config.map((flags) => flags.experimental || flags.enabled || flags.legacy)),
  enableParallel: Config.all({
    enabled: bool("AO1_ENABLE_PARALLEL"),
    legacy: bool("AO1_EXPERIMENTAL_PARALLEL"),
  }).pipe(Config.map((flags) => flags.enabled || flags.legacy)),
  enableExperimentalModels: bool("AO1_ENABLE_EXPERIMENTAL_MODELS"),
  enableQuestionTool: bool("AO1_ENABLE_QUESTION_TOOL"),
  experimentalReferences: enabledByExperimental("AO1_EXPERIMENTAL_REFERENCES"),
  experimentalBackgroundSubagents: enabledByExperimental("AO1_EXPERIMENTAL_BACKGROUND_SUBAGENTS"),
  experimentalLspTy: bool("AO1_EXPERIMENTAL_LSP_TY"),
  experimentalLspTool: enabledByExperimental("AO1_EXPERIMENTAL_LSP_TOOL"),
  experimentalOxfmt: enabledByExperimental("AO1_EXPERIMENTAL_OXFMT"),
  experimentalPlanMode: enabledByExperimental("AO1_EXPERIMENTAL_PLAN_MODE"),
  experimentalEventSystem: enabledByExperimental("AO1_EXPERIMENTAL_EVENT_SYSTEM"),
  experimentalWorkspaces: enabledByExperimental("AO1_EXPERIMENTAL_WORKSPACES"),
  experimentalIconDiscovery: enabledByExperimental("AO1_EXPERIMENTAL_ICON_DISCOVERY"),
  outputTokenMax: positiveInteger("AO1_EXPERIMENTAL_OUTPUT_TOKEN_MAX"),
  bashDefaultTimeoutMs: positiveInteger("AO1_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS"),
  experimentalNativeLlm: bool("AO1_EXPERIMENTAL_NATIVE_LLM"),
  experimentalWebSockets: bool("AO1_EXPERIMENTAL_WEBSOCKETS"),
  client: Config.string("AO1_CLIENT").pipe(Config.withDefault("cli")),
}) {}

export type Info = Context.Service.Shape<typeof Service>

const emptyConfigLayer = Service.defaultLayer.pipe(
  Layer.provide(ConfigProvider.layer(ConfigProvider.fromUnknown({}))),
  Layer.orDie,
)

export const layer = (overrides: Partial<Info> = {}) =>
  Layer.effect(
    Service,
    Effect.gen(function* () {
      const flags = yield* Service
      return Service.of({ ...flags, ...overrides })
    }),
  ).pipe(Layer.provide(emptyConfigLayer))

export const defaultLayer = Service.defaultLayer.pipe(Layer.orDie)

export const node = LayerNode.make({ service: Service, layer: defaultLayer, deps: [] })

export * as RuntimeFlags from "./runtime-flags"
import { LayerNode } from "@ao1-ai/core/effect/layer-node"
