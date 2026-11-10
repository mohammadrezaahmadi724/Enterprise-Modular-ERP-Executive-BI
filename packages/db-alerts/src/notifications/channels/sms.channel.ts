export async function deliverSms(input: { to: string; body: string }): Promise<{ providerMessageId: string }> {
  void input;
  return { providerMessageId: `kavenegar-${Date.now()}` };
}
