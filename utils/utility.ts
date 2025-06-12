export function sanitizeText(input: string): string {
  return (
    input
      // Replace all whitespace characters (including tabs, newlines, etc.) with space
      .replace(/[\t\n\r\f\v]+/g, " ")
      // Remove non-printable ASCII characters (0-31 and 127)
      .replace(/[\x00-\x1F\x7F]/g, "")
      // Collapse multiple spaces to one
      .replace(/\s+/g, " ")
      // Replace hyphens with spaces
      .replace(/-/g, " ")
      // Trim leading/trailing whitespace
      .trim()
  );
}

export function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}
