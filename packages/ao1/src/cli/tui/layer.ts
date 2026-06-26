import { run as runTui, type TuiInput } from "@ao1-ai/tui"
import { Global } from "@ao1-ai/core/global"
import { Effect } from "effect"

export function run(input: TuiInput) {
  return runTui(input).pipe(Effect.provide(Global.defaultLayer))
}
