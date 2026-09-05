export interface IntegrationResult {
  status: "success" | "error";
  message: string;
}

export async function copyToClipboard(
  value: string,
  successMessage: string
): Promise<IntegrationResult> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(value);
      return { status: "success", message: successMessage };
    }
    return { status: "error", message: value };
  } catch {
    return { status: "error", message: value };
  }
}
