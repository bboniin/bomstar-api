import prismaClient from '../../prisma'

interface PostRequest {
    post_id: string;
}

class GetPostService {
    async execute({ post_id}: PostRequest) {

        const post = await prismaClient.post.findUnique({
            where: {
                id: post_id
            },
            include: {
                admin: {
                    select: {
                        photo: true,
                        name: true,
                    }
                }
            }
        })

        if (!post) {
            throw new Error("Post não encontrado")
        }

        return (post)
    }
}

export { GetPostService }