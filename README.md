# QA Prompts MCP Server

An MCP (Model Context Protocol) server that provides QA prompt templates for mobile automation teams. It exposes structured **prompts and tools** for automation code generation, failure analysis, and bug standardization — all usable directly inside [Cursor](https://cursor.com).

## Quick Start (No Clone Required)

Add this to your Cursor MCP config file (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "qa-prompts": {
      "command": "npx",
      "args": ["-y", "github:swapnilGirishPawar/Custom-MCP-Server-Mobile-QA"]
    }
  }
}
```

Restart Cursor. The prompts will be available immediately via the `/` slash command in chat.

This server also exposes the same capabilities as MCP **tools**, which can be invoked by MCP clients (and may be used automatically by Cursor when tool-calling is enabled).

## Available Prompts (Slash Commands)

### 1. Manual → Automation Conversion

| Prompt | What It Does |
|---|---|
| `/convert-manual-to-automation` | Converts manual test cases into Appium + Java + TestNG automation scripts following POM architecture |
| `/refactor-automation-code` | Performs a deep PR review of existing automation code and generates a structured review report |
| `/xml-to-pom-locators` | Converts Appium Inspector Page Source XML into POM locator declarations (ID > Accessibility > XPath priority) |

### 2. Debugging & Failure Analysis

| Prompt | What It Does |
|---|---|
| `/analyze-test-failure` | Analyzes Appium test failure logs to determine root cause, severity, flakiness risk, and fix recommendations |

### 3. Bug Standardization

| Prompt | What It Does |
|---|---|
| `/standardize-bug-report` | Converts a bug title/description into a standardized bug report following the organization template |

## Available Tools (MCP Tools)

Each prompt is also registered as an MCP tool with the **same name** (without the leading `/`).

| Tool | What It Does |
|---|---|
| `convert-manual-to-automation` | Converts manual test cases into Appium + Java + TestNG automation scripts following POM architecture |
| `refactor-automation-code` | Performs a deep PR review of existing automation code and generates a structured review report |
| `xml-to-pom-locators` | Converts Appium Inspector Page Source XML into POM locator declarations (ID > Accessibility > XPath priority) |
| `analyze-test-failure` | Analyzes Appium test failure logs to determine root cause, severity, flakiness risk, and fix recommendations |
| `standardize-bug-report` | Converts a bug title/description into a standardized bug report following the organization template |

Notes:
- **`standardize-bug-report` tool output**: the tool output format does **not** include a `<Title>` line; it returns only **[Issue]**, **[Reproduction steps]**, **[Screenshot]**, **[Expected Result]** (with those headings expected to be **bold**).

## Usage

1. Open Cursor chat (`Cmd+L`) or Composer (`Cmd+I`)
2. Type `/` to see the list of available prompts
3. Select a prompt
4. Fill in the required inputs
5. Submit — the AI processes the full prompt template and returns structured output

### Example: Standardize a Bug Report

1. Type `/standardize-bug-report` in chat
2. Fill in:
   - **bugDescription**: `login button not working on iOS after update`
   - **additionalContext** (optional): `Build 2.3.1, iPhone 15, Premium account`
3. The AI generates a complete standardized bug report (including a rewritten title), issue, reproduction steps, and expected result

### Example: Convert Manual Test Case to Automation

1. Type `/convert-manual-to-automation` in chat
2. Fill in:
   - **featureNavigation**: `Settings → Notifications → Push Notifications`
   - **manualTestCase**: (paste your manual test case)
   - **existingCode** (optional): (paste any existing Page Objects or BaseTest for context)
3. The AI generates a complete TestNG test class with POM, annotations, and framework conventions

## Prompt / Tool Inputs Reference

| Name | Required Inputs | Optional Inputs |
|---|---|---|
| `convert-manual-to-automation` | `featureNavigation`, `manualTestCase` | `existingCode` |
| `refactor-automation-code` | `code` | — |
| `xml-to-pom-locators` | `pageSourceXml` | — |
| `analyze-test-failure` | `failureLogs` | — |
| `standardize-bug-report` | `bugDescription` | `additionalContext` |

## Local Development

```bash
# Clone the repo
git clone https://github.com/swapnilGirishPawar/Custom-MCP-Server-Mobile-QA.git
cd Custom-MCP-Server-Mobile-QA

# Install dependencies
npm install

# Build
npm run build

# Run locally
npm start
```

For development with auto-reload, use `npm run dev` (requires `tsx`).

To test locally before pushing, point your MCP config to the local build:

```json
{
  "mcpServers": {
    "qa-prompts": {
      "command": "node",
      "args": ["/absolute/path/to/Custom-MCP-Server-Mobile-QA/dist/index.js"]
    }
  }
}
```

## Tech Stack

- **TypeScript** with strict mode
- **@modelcontextprotocol/sdk** v1.27+
- **Zod** v4 for input validation
- **stdio** transport for Cursor integration
