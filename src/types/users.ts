export type Users = {
    id: number,
    username: string,
    nickname: string,
    provider: string | null,
    providerId: string | null,
    profileImageUrl: string | null,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
    status: 'ACTIVE' | 'BANNED' | 'DELETED'
}