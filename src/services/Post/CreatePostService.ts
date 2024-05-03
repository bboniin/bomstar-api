import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface PostRequest {
    title: string;
    photo: string;
    text: string;
    admin_id: string;
}

class CreatePostService {
    async execute({ title, text, photo, admin_id }: PostRequest) {

        if (!title || !text || !photo) {
            throw new Error("Titulo, Texto e Imagem são obrigatórios")
        }

        const s3Storage = new S3Storage()

        const upload = await s3Storage.saveFile(photo)

        const photoUp = upload

        const post = await prismaClient.post.create({
            data: {
                title: title,
                text: text,
                admin_id: admin_id,
                photo: photoUp
            },
        })

        return (post)
    }
}

export { CreatePostService }