import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerStandardizeBugReport(server: McpServer): void {
  server.registerPrompt(
    "standardize-bug-report",
    {
      title: "Standardize Bug Report",
      description:
        "Converts a bug title or description into a properly structured, standardized bug report following the organization's template.",
      argsSchema: {
        bugDescription: z
          .string()
          .describe(
            "The bug title or description to convert into a standardized bug report"
          ),
        additionalContext: z
          .string()
          .optional()
          .describe(
            "Optional additional context such as environment details, build version, platform, account type, etc."
          ),
      },
    },
    async (args) => {
      const contextBlock = args.additionalContext
        ? `\n(Additional Context provided:)\n${args.additionalContext}`
        : "";

      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Act as a Senior QA Engineer with strong experience in writing high-quality, standardized bug reports.

Your task is to convert the given Bug Title (and optional context if provided) into a properly structured bug report following my organization's standard template.

---------------------------------
ORGANIZATION BUG FORMAT (STRICT)
---------------------------------

<Title>

[Issue] -

[Reproduction steps] -
1.
2.
3.

[Screenshot] -

[Expected Result] -

---------------------------------
INSTRUCTIONS
---------------------------------

1. Improve and rewrite the Title to be:
   - Clear
   - Specific
   - Reproducible
   - Professional
   - Without unnecessary words

2. In [Issue]:
   - Clearly describe what is happening
   - Mention actual behavior
   - Include environment if relevant (Build, Platform, Account type, etc.)
   - Keep it precise but complete

3. In [Reproduction steps]:
   - Write clean, numbered, reproducible steps
   - Avoid vague steps like "do something"
   - Make them executable by another tester
   - Minimum 3 logical steps if possible

4. In [Screenshot]:
   - If no screenshot context is given, Keep it empty.

5. In [Expected Result]:
   - Clearly describe correct behavior
   - Be specific
   - Avoid generic phrases like "should work properly"

---------------------------------
IMPORTANT RULES
---------------------------------

- Do NOT add extra sections.
- Do NOT add Actual Result section (unless explicitly provided).
- Keep it concise and professional.
- Use strong QA language.
- Avoid assumptions if information is missing.
- If data is insufficient, intelligently infer realistic steps based on standard mobile app behavior.

---------------------------------

Now convert the following Bug Description into a standardized bug report:

${args.bugDescription}
${contextBlock}`,
            },
          },
        ],
      };
    }
  );
}
