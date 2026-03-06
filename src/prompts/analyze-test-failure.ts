import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerAnalyzeTestFailure(server: McpServer): void {
  server.registerPrompt(
    "analyze-test-failure",
    {
      title: "Appium Test Failure Root Cause Analyzer",
      description:
        "Performs deep failure analysis of Appium test logs to determine the true root cause, classify severity, assess flakiness risk, and provide fix recommendations.",
      argsSchema: {
        failureLogs: z
          .string()
          .describe(
            "The complete failure logs from the Appium test execution to analyze"
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
              text: `Act as a Senior Mobile Automation Architect specializing in Appium 3.0 + Java + TestNG (POM framework).

Your task is to perform a deep failure analysis of the provided Appium test logs and determine the TRUE root cause.

Do NOT guess. Base your reasoning strictly on log evidence.

---------------------------------
ANALYSIS REQUIREMENTS
---------------------------------

1. Identify the Failure Category:
   - Locator Issue
   - Synchronization / Wait Issue
   - App Crash
   - Appium Driver Issue
   - Session / Capability Issue
   - Environment / Device Issue
   - Network Issue
   - Test Logic Issue
   - CI/CD Infrastructure Issue
   - Flaky / Non-deterministic Failure

2. Extract the Exact Root Cause
   - Point to specific log lines
   - Explain what technically failed
   - Identify trigger event

3. Classify the Failure Severity
   - Test Bug
   - Framework Bug
   - Application Bug
   - Infra Issue
   - External Dependency Issue

4. Determine Flakiness Risk
   - Is this deterministic?
   - What makes it flaky?
   - Probability of recurrence (Low / Medium / High)

5. Provide Fix Recommendation
   - Code-level fix
   - Locator improvement (if needed)
   - Wait strategy correction
   - Capability correction
   - Appium configuration correction

6. Provide Prevention Strategy
   - Framework-level improvement
   - Logging improvement
   - Assertion enhancement
   - Retry or stabilization strategy
   - Architecture suggestion

---------------------------------
OUTPUT FORMAT (STRICT)
---------------------------------

Return the report in this exact structure:

---------------------------------
APPIUM FAILURE ANALYSIS REPORT
---------------------------------

Failure Summary:
(1-2 line summary)

Failure Category:
(One primary category + optional secondary)

Root Cause:
(Precise technical explanation with log reference)

Technical Breakdown:
- What happened
- Why it happened
- What triggered it

Severity Classification:
(Test / Framework / App / Infra / External)

Flakiness Risk:
(Low / Medium / High + reasoning)

Recommended Fix:
(Concrete, actionable solution)

Prevention Strategy:
(Long-term framework improvement suggestion)

Confidence Level:
(Percentage confidence in diagnosis)

---------------------------------

IMPORTANT RULES:
- Be strict and realistic.
- Avoid generic answers like "add explicit wait".
- Explain WHY the wait failed.
- If information is insufficient, clearly state what is missing.
- Think like a Staff Automation Architect reviewing a production failure.

Now analyze the following logs:

${args.failureLogs}`,
            },
          },
        ],
      };
    }
  );
}

export function registerAnalyzeTestFailureTool(server: McpServer): void {
  server.registerTool(
    "analyze-test-failure",
    {
      title: "Appium Test Failure Root Cause Analyzer",
      description:
        "Performs deep failure analysis of Appium test logs to determine the true root cause, classify severity, assess flakiness risk, and provide fix recommendations.",
      inputSchema: {
        failureLogs: z
          .string()
          .describe(
            "The complete failure logs from the Appium test execution to analyze"
          ),
      },
    },
    async (args) => {
      return {
        content: [
          {
            type: "text",
            text: `Act as a Senior Mobile Automation Architect specializing in Appium 3.0 + Java + TestNG (POM framework).

Your task is to perform a deep failure analysis of the provided Appium test logs and determine the TRUE root cause.

Do NOT guess. Base your reasoning strictly on log evidence.

---------------------------------
ANALYSIS REQUIREMENTS
---------------------------------

1. Identify the Failure Category:
   - Locator Issue
   - Synchronization / Wait Issue
   - App Crash
   - Appium Driver Issue
   - Session / Capability Issue
   - Environment / Device Issue
   - Network Issue
   - Test Logic Issue
   - CI/CD Infrastructure Issue
   - Flaky / Non-deterministic Failure

2. Extract the Exact Root Cause
   - Point to specific log lines
   - Explain what technically failed
   - Identify trigger event

3. Classify the Failure Severity
   - Test Bug
   - Framework Bug
   - Application Bug
   - Infra Issue
   - External Dependency Issue

4. Determine Flakiness Risk
   - Is this deterministic?
   - What makes it flaky?
   - Probability of recurrence (Low / Medium / High)

5. Provide Fix Recommendation
   - Code-level fix
   - Locator improvement (if needed)
   - Wait strategy correction
   - Capability correction
   - Appium configuration correction

6. Provide Prevention Strategy
   - Framework-level improvement
   - Logging improvement
   - Assertion enhancement
   - Retry or stabilization strategy
   - Architecture suggestion

---------------------------------
OUTPUT FORMAT (STRICT)
---------------------------------

Return the report in this exact structure:

---------------------------------
APPIUM FAILURE ANALYSIS REPORT
---------------------------------

Failure Summary:
(1-2 line summary)

Failure Category:
(One primary category + optional secondary)

Root Cause:
(Precise technical explanation with log reference)

Technical Breakdown:
- What happened
- Why it happened
- What triggered it

Severity Classification:
(Test / Framework / App / Infra / External)

Flakiness Risk:
(Low / Medium / High + reasoning)

Recommended Fix:
(Concrete, actionable solution)

Prevention Strategy:
(Long-term framework improvement suggestion)

Confidence Level:
(Percentage confidence in diagnosis)

---------------------------------

IMPORTANT RULES:
- Be strict and realistic.
- Avoid generic answers like "add explicit wait".
- Explain WHY the wait failed.
- If information is insufficient, clearly state what is missing.
- Think like a Staff Automation Architect reviewing a production failure.

Now analyze the following logs:

${args.failureLogs}`,
          },
        ],
      };
    }
  );
}
