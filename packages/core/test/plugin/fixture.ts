import { Credential } from "@ao1-ai/core/credential"
import { EventV2 } from "@ao1-ai/core/event"
import { FileSystem } from "@ao1-ai/core/filesystem"
import { FSUtil } from "@ao1-ai/core/fs-util"
import { Global } from "@ao1-ai/core/global"
import { Npm } from "@ao1-ai/core/npm"
import { PluginV2 } from "@ao1-ai/core/plugin"
import { RepositoryCache } from "@ao1-ai/core/repository-cache"
import { Ripgrep } from "@ao1-ai/core/ripgrep"
import { SkillDiscovery } from "@ao1-ai/core/skill/discovery"
import { Effect, Layer } from "effect"
import { FetchHttpClient } from "effect/unstable/http"
import { tempLocationLayer } from "../fixture/location"

export const PluginTestLayer = Layer.mergeAll(FileSystem.locationLayer, PluginV2.locationLayer).pipe(
  Layer.provideMerge(
    Layer.mergeAll(
      Credential.defaultLayer,
      EventV2.defaultLayer,
      FetchHttpClient.layer,
      FSUtil.defaultLayer,
      Global.defaultLayer,
      Layer.succeed(
        Npm.Service,
        Npm.Service.of({
          add: () => Effect.succeed({ directory: "", entrypoint: undefined }),
          install: () => Effect.void,
          which: () => Effect.succeed(undefined),
        }),
      ),
      RepositoryCache.defaultLayer,
      SkillDiscovery.defaultLayer,
      Ripgrep.defaultLayer,
      tempLocationLayer,
    ),
  ),
)
