import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface PostRequest {
    title: string;
    image: string;
    text: string;
    admin_id: string;
}

class CreatePostService {
    async execute({ title, text, image, admin_id }: PostRequest) {

        if (!title || !text || !image) {
            throw new Error("Titulo, Texto e Imagem são obrigatórios")
        }

        const s3Storage = new S3Storage()

        const upload = await s3Storage.saveFile(image)

        const imageUp = upload

        const post = await prismaClient.post.create({
            data: {
                title: title,
                text: text,
                admin_id: admin_id,
                image: imageUp
            },
        })

        return (post)
    }
}

export { CreatePostService }