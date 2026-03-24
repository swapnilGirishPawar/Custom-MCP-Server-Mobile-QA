import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const PROMPT_BODY = (className: string) => `Act as a senior test automation architect.

Task:
Analyze the existing test classes in the test suite located at:
src/test/java/testsuite

Objective:
Generate new classes that match the exact architecture, coding conventions, and initialization patterns used in that suite.

Requirements:
1. Create a new test class named: ${className}
2. It must follow:
   - same inheritance hierarchy
   - same annotations
   - same setup/teardown pattern
   - same driver initialization approach
3. Create a corresponding page class:
   Based on the test class name
   inside the appropriate pages directory.
4. Include:
   - all necessary imports
   - class structure
   - constructor pattern
   - locators
   - reusable methods
   - one sample test method validating structure

Constraints:
- Must strictly match the style and architecture used in existing Settings test classes
- Do NOT invent new framework patterns
- Reuse existing base classes/utilities if present
- Follow clean code + modular design

Output Format:
Return:
1. ${className}Tests.java
2. ${className}Page.java

Each file should be complete and ready to compile.

Context:
The framework already contains existing test classes inside the specified path. Your solution must mirror their structure and conventions exactly.`;

export function registerGenerateJavaTestSuiteClass(server: McpServer): void {
  server.registerPrompt(
    "Automation-initialization-code",
    {
      title: "Generate Java Test + Page Class (testsuite)",
      description:
        "Produces scaffold Java test and page classes matching src/test/java/testsuite architecture, using a required class name.",
      argsSchema: {
        className: z
          .string()
          .min(1, "Class name is required")
          .describe(
            "Base class name for the new test and page (e.g. SettingsProfile — without Tests/Page suffix unless that is your suite convention)"
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
              text: PROMPT_BODY(args.className.trim()),
            },
          },
        ],
      };
    }
  );
}

export function registerGenerateJavaTestSuiteClassTool(server: McpServer): void {
  server.registerTool(
    "Automation-initialization-code",
    {
      title: "Generate Java Test + Page Class (testsuite)",
      description:
        "Returns the prompt text to generate Java test and page classes matching src/test/java/testsuite, for class name: required.",
      inputSchema: {
        className: z
          .string()
          .min(1, "Class name is required")
          .describe(
            "Base class name for the new test and page (e.g. SettingsProfile — without Tests/Page suffix unless that is your suite convention)"
          ),
      },
    },
    async (args) => {
      return {
        content: [
          {
            type: "text",
            text: PROMPT_BODY(args.className.trim()),
          },
        ],
      };
    }
  );
}
