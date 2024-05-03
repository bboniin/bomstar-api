import prismaClient from '../../prisma'

interface PostRequest {
    page: number;
    home: boolean;
}

class ListPostsService {
    async execute({ page, home }: PostRequest) {

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
            skip: home ? 0 : page * 12,
            take: home ? 3 : 12,
            orderBy: {
                created_at: "asc"
            },
        })

        return ({posts, postsTotal})
    }
}

export { ListPostsService }