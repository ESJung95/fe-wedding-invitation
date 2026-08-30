import { copyToClipboard, type IntegrationResult } from "@/lib/clipboard";

export async function copyAccountNumber(value: string): Promise<IntegrationResult> {
  return copyToClipboard(value, "계좌번호가 복사되었습니다");
}
