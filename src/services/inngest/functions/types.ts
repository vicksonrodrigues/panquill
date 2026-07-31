export type ClerkWebhookData<T> = {
    data: T
    raw: string
    headers: Record<string, string>

}