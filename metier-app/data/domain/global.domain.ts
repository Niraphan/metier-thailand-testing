export type ApiStatus = "success" | "error"

export interface ApiEnvelope<TData> {
    success: boolean
    data: TData
    page?: number
    limit?: number
    total?: number
    totalPages?: number
}
