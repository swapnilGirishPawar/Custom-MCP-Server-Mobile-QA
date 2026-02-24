import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerXmlToPomLocators(server: McpServer): void {
  server.registerPrompt(
    "xml-to-pom-locators",
    {
      title: "Appium Inspector XML → POM Locators",
      description:
        "Converts Appium Inspector Page Source XML into POM locator declarations with proper locator strategy priority (ID > Accessibility > XPath).",
      argsSchema: {
        pageSourceXml: z
          .string()
          .describe(
            "The Appium Inspector Page Source XML to convert into POM locators"
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
              text: `Act as a Senior Mobile Automation QA Engineer working with Appium 3.0 + Java + TestNG using Page Object Model (POM).

Your task is to convert the given Appium Inspector Page XML into POM locator declarations.

INSTRUCTIONS:

1. Analyze the XML carefully.
2. Identify meaningful and interactable elements only (buttons, text fields, labels, toggles, tabs, etc.).
3. Generate POM locator declarations based on the PRIORITY below.

========================
LOCATOR PRIORITY RULE (STRICT ORDER):
========================

1. First preference → ID
   - If "resource-id" (Android) or "name/id" (iOS) is available and unique, use ID.
   - Do NOT use XPath if ID is available.

2. Second preference → Accessibility ID
   - If accessibility-id/content-desc/label is available and ID is not present, use accessibility.
   - Do NOT use XPath if accessibility is available.

3. Third preference → XPath
   - Use XPath ONLY if both ID and Accessibility are unavailable.
   - XPath should be stable and optimized.
   - Avoid absolute XPath.
   - Prefer attribute-based XPath.
   - Avoid index-based XPath unless absolutely required.

========================
OUTPUT FORMAT RULES:
========================

- Only return locator declarations.
- Do NOT explain anything.
- Do NOT return XML.
- Do NOT add comments.
- Variable names must be meaningful and in camelCase.
- Keep naming clean and readable.
- One locator block per element.

========================
LOCATOR FORMAT:
========================

FOR ID:
@iOSXCUITFindBy(id = "")
@AndroidFindBy(id = "")
private WebElement elementName;

FOR ACCESSIBILITY:
@iOSXCUITFindBy(accessibility = "")
@AndroidFindBy(accessibility = "")
private WebElement elementName;

FOR XPATH:
@iOSXCUITFindBy(xpath = "")
@AndroidFindBy(xpath = "")
private WebElement elementName;

========================
IMPORTANT:
========================

- If ID is available → use ID only.
- If ID not available but Accessibility is available → use Accessibility.
- If both are missing → use XPath.
- Never mix locator strategies for same element.
- Do not generate duplicate locators.
- Do not generate unnecessary elements like layout containers.

========================
INPUT:
Appium Inspector Page Source XML:
${args.pageSourceXml}
========================`,
            },
          },
        ],
      };
    }
  );
}
