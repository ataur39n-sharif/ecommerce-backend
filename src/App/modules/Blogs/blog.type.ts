export interface IBlog {
    title: string
    slug: string
    content: string
    thumbnail?: string | null
    images?: string[]
    createdAt?: string
    updatedAt?: string
}

export interface IBlogImages {
    thumbnail?: Express.Multer.File[],
    images?: Express.Multer.File[],
}