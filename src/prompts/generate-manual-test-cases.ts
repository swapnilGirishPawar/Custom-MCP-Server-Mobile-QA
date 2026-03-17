import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const PROMPT_ID = "generate-manual-test-cases";

function buildPromptText(featureDescription: string): string {
  return `Follow these STRICT rules when generating test cases.

FORMAT RULE
Every test case must be written in this format only:

Action. Expected Result.

Example:
Tap Login button. User is logged in successfully.

TEST COVERAGE
Always include:
- Positive scenarios
- Negative scenarios
- Edge cases
- Navigation scenarios
- Back navigation scenarios
- Browser/WebView return scenarios (if navigation happens)
- Basic verification after navigation

TESTING SCOPE
Focus primarily on:
- UI interactions
- Navigation
- Button taps
- External links
- Native screen navigation
- Browser/WebView behavior
- Back navigation to previous screen

If any requirement is unclear, ask questions BEFORE generating test cases.

Now generate test cases for the following feature/screen:

${featureDescription}`;
}

export function registerGenerateManualTestCases(server: McpServer): void {
  server.registerPrompt(
    PROMPT_ID,
    {
      title: "Generate Manual Test Cases (Strict Format)",
      description:
        "Generates manual test cases in strict 'Action. Expected Result.' format with required coverage (positive/negative/edge/navigation/back/WebView).",
      argsSchema: {
        featureDescription: z
          .string()
          .describe(
            "The feature/screen description to generate strict-format manual test cases for"
          ),
      },
    },
    async (args) => {
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: buildPromptText(args.featureDescription),
            },
          },
        ],
      };
    }
  );
}

export function registerGenerateManualTestCasesTool(server: McpServer): void {
  server.registerTool(
    PROMPT_ID,
    {
      title: "Generate Manual Test Cases (Strict Format)",
      description:
        "Generates manual test cases in strict 'Action. Expected Result.' format with required coverage (positive/negative/edge/navigation/back/WebView).",
      inputSchema: {
        featureDescription: z
          .string()
          .describe(
            "The feature/screen description to generate strict-format manual test cases for"
          ),
      },
    },
    async (args) => {
      return {
        content: [
          {
            type: "text",
            text: buildPromptText(args.featureDescription),
          },
        ],
      };
    }
  );
}

