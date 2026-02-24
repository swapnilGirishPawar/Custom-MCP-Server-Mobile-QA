#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerConvertManualToAutomation } from "./prompts/convert-manual-to-automation.js";
import { registerRefactorAutomationCode } from "./prompts/refactor-automation-code.js";
import { registerXmlToPomLocators } from "./prompts/xml-to-pom-locators.js";
import { registerAnalyzeTestFailure } from "./prompts/analyze-test-failure.js";
import { registerStandardizeBugReport } from "./prompts/standardize-bug-report.js";

const server = new McpServer({
  name: "qa-prompts-mcp-server",
  version: "1.0.0",
});

registerConvertManualToAutomation(server);
registerRefactorAutomationCode(server);
registerXmlToPomLocators(server);
registerAnalyzeTestFailure(server);
registerStandardizeBugReport(server);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error: unknown) => {
  process.stderr.write(
    `Fatal error starting MCP server: ${error instanceof Error ? error.message : String(error)}\n`
  );
  process.exit(1);
});
