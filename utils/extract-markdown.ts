const extractMarkdown = (input: string) => {
  // Regular expression to match ```markdown ... ``` code blocks
  const markdownBlockRegex = /^```markdown\s*([\s\S]*?)\s*```$/m;
  const match = input.match(markdownBlockRegex);

  // If wrapped in ```markdown, return the inner content; otherwise, return the input as-is
  return match ? match[1].trim() : input.trim();
};

export default extractMarkdown;
