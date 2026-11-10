export async function deliverWebPush(input: { endpoint: string; payload: string }): Promise<{ providerMessageId: string }> {
  void input;
  return { providerMessageId: `webpush-${Date.now()}` };
}
