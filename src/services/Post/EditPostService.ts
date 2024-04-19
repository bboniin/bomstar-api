import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface PostRequest {
    title: string;
    image: string;
    text: string;
    post_id: string;
}

class EditPostService {
    async execute({ title, text, image, post_id }: PostRequest) {

        if (!title || !text) {
            throw new Error("Titulo e Texto são obrigatórios")
        }

        const post = await prismaClient.post.findUnique({
            where: {
                id: post_id,
            }
        })

        if (!post) {
            throw new Error("Post não encontrado")
        }

        let data = {
            title: title,
            text: text,
        }

        if (image) {
            const s3Storage = new S3Storage()

            const upload = await s3Storage.saveFile(image)

            data["image"] = upload

            if (post.image) {
                await s3Storage.deleteFile(post.image)
            }
        }

        const postEdit = await prismaClient.post.update({
            where: {
                id: post_id,
            },
            data: data,
        })

        return (postEdit)
    }
}

export { EditPostService }