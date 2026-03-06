import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerConvertManualToAutomation(server: McpServer): void {
  server.registerPrompt(
    "convert-manual-to-automation",
    {
      title: "Convert Manual Test Case → Automation Skeleton",
      description:
        "Converts manual test cases into well-structured Appium + Java + TestNG automation scripts following POM architecture.",
      argsSchema: {
        featureNavigation: z
          .string()
          .describe(
            "Navigation path from Calendar Tab to the feature entry point, e.g. 'Calendar Tab → Settings → Notifications → Feature Starts'"
          ),
        manualTestCase: z
          .string()
          .describe("The manual test case(s) to convert into automation code"),
        existingCode: z
          .string()
          .optional()
          .describe(
            "Existing automation code for context (optional). Paste any relevant Page Objects, BaseTest, or utility classes."
          ),
      },
    },
    async (args) => {
      const existingCodeBlock = args.existingCode
        ? `Existing Code for Context:\n${args.existingCode}`
        : "Existing Code for Context:\nNone provided.";

      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Act as a Senior Automation QA Engineer working on an Appium + Java + TestNG Native Mobile (Android & iOS) UI Automation framework.

Your task is to convert the provided manual test cases into well-structured automation test scripts.

========================
GENERIC REQUIREMENTS
========================

1. Follow the existing automation framework architecture:
   - Page Object Model (POM)
   - TestNG
   - Appium 3.0
   - Java

2. Test methods must:
   - Follow camelCase naming convention
   - Include proper @Test priority
   - Include meaningful description
   - Include proper groups (default must include "regression")
   - Always have enabled = true

3. Dependency Rules:
   - Each test case must either:
     a) Be dependent on a previous test case using dependsOnMethods
     OR
     b) Be completely independent

4. If a test case is independent:
   - Required preconditions must be implemented
   - Preconditions must be placed inside @BeforeTest
   - @BeforeTest must be common for all test cases in the class or it should be handled explicitly for required testcase.

5. Feature Navigation:
   - Include feature navigation as the FIRST test case in the class
   - Navigation Flow:
     App Launch → ${args.featureNavigation} → Feature Entry Point

6. Class Requirements:
   - Class must extend BaseTest
   - Follow clean code principles
   - Use proper Java formatting and linting standards

========================
FRAMEWORK-SPECIFIC REQUIREMENTS
========================

1. Analyze any provided existing code before implementing new tests.
2. Use framework utility methods:
   - passMessage(String message)
   - failMessage(String message)

   These methods log results to:
   - Extent Reports
   - Logger

   Ensure meaningful messages are passed.

========================
INPUTS
========================

Feature Navigation:
App Starts from Calendar Tab → ${args.featureNavigation} → Feature Starts

${existingCodeBlock}

Manual Test Case(s):
${args.manualTestCase}

========================
EXPECTED OUTPUT
========================

- Provide complete Test Class
- Proper Page Object usage
- Proper annotations
- Clean, formatted, and maintainable automation code
- Follow framework conventions strictly`,
            },
          },
        ],
      };
    }
  );
}

export function registerConvertManualToAutomationTool(server: McpServer): void {
  server.registerTool(
    "convert-manual-to-automation",
    {
      title: "Convert Manual Test Case → Automation Skeleton",
      description:
        "Converts manual test cases into well-structured Appium + Java + TestNG automation scripts following POM architecture.",
      inputSchema: {
        featureNavigation: z
          .string()
          .describe(
            "Navigation path from Calendar Tab to the feature entry point, e.g. 'Calendar Tab → Settings → Notifications → Feature Starts'"
          ),
        manualTestCase: z
          .string()
          .describe("The manual test case(s) to convert into automation code"),
        existingCode: z
          .string()
          .optional()
          .describe(
            "Existing automation code for context (optional). Paste any relevant Page Objects, BaseTest, or utility classes."
          ),
      },
    },
    async (args) => {
      const existingCodeBlock = args.existingCode
        ? `Existing Code for Context:\n${args.existingCode}`
        : "Existing Code for Context:\nNone provided.";

      return {
        content: [
          {
            type: "text",
            text: `Act as a Senior Automation QA Engineer working on an Appium + Java + TestNG Native Mobile (Android & iOS) UI Automation framework.

Your task is to convert the provided manual test cases into well-structured automation test scripts.

========================
GENERIC REQUIREMENTS
========================

1. Follow the existing automation framework architecture:
   - Page Object Model (POM)
   - TestNG
   - Appium 3.0
   - Java

2. Test methods must:
   - Follow camelCase naming convention
   - Include proper @Test priority
   - Include meaningful description
   - Include proper groups (default must include "regression")
   - Always have enabled = true

3. Dependency Rules:
   - Each test case must either:
     a) Be dependent on a previous test case using dependsOnMethods
     OR
     b) Be completely independent

4. If a test case is independent:
   - Required preconditions must be implemented
   - Preconditions must be placed inside @BeforeTest
   - @BeforeTest must be common for all test cases in the class or it should be handled explicitly for required testcase.

5. Feature Navigation:
   - Include feature navigation as the FIRST test case in the class
   - Navigation Flow:
     App Launch → ${args.featureNavigation} → Feature Entry Point

6. Class Requirements:
   - Class must extend BaseTest
   - Follow clean code principles
   - Use proper Java formatting and linting standards

========================
FRAMEWORK-SPECIFIC REQUIREMENTS
========================

1. Analyze any provided existing code before implementing new tests.
2. Use framework utility methods:
   - passMessage(String message)
   - failMessage(String message)

   These methods log results to:
   - Extent Reports
   - Logger

   Ensure meaningful messages are passed.

========================
INPUTS
========================

Feature Navigation:
App Starts from Calendar Tab → ${args.featureNavigation} → Feature Starts

${existingCodeBlock}

Manual Test Case(s):
${args.manualTestCase}

========================
EXPECTED OUTPUT
========================

- Provide complete Test Class
- Proper Page Object usage
- Proper annotations
- Clean, formatted, and maintainable automation code
- Follow framework conventions strictly`,
          },
        ],
      };
    }
  );
}
