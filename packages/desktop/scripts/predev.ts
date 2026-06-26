import { $ } from "bun"

await $`bun ./scripts/copy-icons.ts ${process.env.AO1_CHANNEL ?? "dev"}`

await $`cd ../opencode && bun script/build-node.ts`
