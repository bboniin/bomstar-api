import prismaClient from '../../prisma'

interface PostRequest {
    page: number;
}

class ListPostsService {
    async execute({ page }: PostRequest) {

        const postsTotal = await prismaClient.post.count()

        const posts = await prismaClient.post.findMany({
            include: {
                admin: {
                    select: {
                        photo: true,
                        name: true,
                    }
                }
            },
            skip: page * 12,
            take: 12,
            orderBy: {
                created_at: "asc"
            }
        })

        return ({posts, postsTotal})
    }
}

export { ListPostsService }