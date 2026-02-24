import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerRefactorAutomationCode(server: McpServer): void {
  server.registerPrompt(
    "refactor-automation-code",
    {
      title: "Refactor Existing Automation Code",
      description:
        "Performs a deep technical PR review of Appium + Java + TestNG automation code and generates a professional PR Review Report.",
      argsSchema: {
        code: z
          .string()
          .describe(
            "The automation code to review. Paste the full class or relevant code blocks."
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
              text: `Act as a Senior Automation QA Architect with 8+ years of experience in Appium 3.0 + Java + TestNG using Page Object Model (POM).

Your task is to perform a deep technical review of the selected automation code and generate a professional PR Review Report.

Focus on:

1. Code Quality & Clean Code
   - Naming conventions (methods, variables, classes)
   - Readability & structure
   - Method size & SRP (Single Responsibility Principle)
   - Reusability
   - Hardcoded values
   - Magic numbers / strings
   - Code duplication

2. Framework Architecture
   - Proper POM implementation
   - Separation of concerns (Test vs Page vs Utils)
   - BaseTest usage
   - Driver handling
   - Wait strategy (implicit vs explicit vs fluent)
   - Stability improvements
   - Dependency handling between tests

3. Appium Best Practices
   - Locator strategy quality (ID > Accessibility > XPath)
   - XPath optimization
   - Flaky locator risks
   - Mobile-specific stability issues
   - Platform-specific handling (Android/iOS)

4. TestNG Best Practices
   - Proper use of annotations
   - Test independence
   - Priority usage
   - Groups usage
   - Assertions quality
   - Reporting improvements

5. Maintainability & Scalability
   - Extensibility concerns
   - Logging improvements
   - Exception handling
   - Retry mechanisms
   - Parallel execution readiness

6. Performance & Stability
   - Unnecessary sleeps
   - Thread.sleep usage
   - Synchronization gaps
   - Potential flaky scenarios

OUTPUT FORMAT (STRICT):

Provide a structured PR Review Report in the following format:

---------------------------------
PR REVIEW REPORT
---------------------------------

Overall Code Quality Score: X/10

1. Strengths
- Bullet points

2. Critical Issues (Must Fix Before Merge)
- Issue
  - Why it's a problem
  - Recommended Fix

3. Improvements (Should Fix)
- Issue
  - Suggested Refactor

4. Nice to Have Enhancements
- Suggestions

5. Refactored Code Example (If Needed)
- Provide improved version of problematic code snippets

6. Final Recommendation
- Approve / Approve with Changes / Request Changes

IMPORTANT:
- Be strict and realistic like a senior reviewer.
- Do NOT praise unnecessarily.
- Give practical and implementable suggestions.
- Suggest improved code snippets wherever useful.
- Focus on long-term framework health.

Now review the following code:

${args.code}`,
            },
          },
        ],
      };
    }
  );
}
