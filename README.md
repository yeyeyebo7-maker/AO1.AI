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
</p>


[![OpenCode Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://ao1.ai)

---

# AO1 AI — Windows Installation

## Requirements

- Windows 10 or 11
- [Git](https://git-scm.com/downloads/win)
- 10+ GB free disk space

## Step-by-step

### 1. Install Git

Download from **[git-scm.com/downloads/win](https://git-scm.com/downloads/win)**

Run the installer — all default settings are fine. Reopen your Command Prompt after install.

### 2. Install Bun

Open **PowerShell** and run:

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Close and reopen PowerShell after install.

### 2. Clone the repo

Open **Command Prompt** and run:

```cmd
git clone https://github.com/yeyeyebo7-maker/AO1.AI.git %USERPROFILE%\Documents\ao1
```

### 3. Install dependencies

```cmd
cd %USERPROFILE%\Documents\ao1 && bun install
```

This downloads ~100 packages. May take a few minutes.

### 4. Launch AO1

Double-click `AO1.exe` on your Desktop.

Or run from Command Prompt:

```cmd
cd %USERPROFILE%\Documents\ao1\packages\ao1 && bun run --conditions=browser src/index.ts
```

## Updating

To update to the latest version:

```cmd
cd %USERPROFILE%\Documents\ao1 && git pull && bun install
```

## Uninstall

1. Delete `%USERPROFILE%\.bun` folder
2. Delete `%USERPROFILE%\Documents\ao1` folder
3. Delete `AO1.exe` from your Desktop


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
