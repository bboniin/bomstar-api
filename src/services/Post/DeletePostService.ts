import prismaClient from '../../prisma'

interface PostRequest {
    post_id: string;
}

class DeletePostService {
    async execute({ post_id }: PostRequest) {

        const postDelete = await prismaClient.post.delete({
            where: {
                id: post_id,
            }
        })

        return (postDelete)
    }
}

export { DeletePostService }