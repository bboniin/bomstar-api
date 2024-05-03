import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ProductRequest {
    name: string;
    photo: string;
    description: string;
    amount: number;
    value: number;
    is_bomstar: boolean;
    is_social: boolean;
}

class CreateProductService {
    async execute({ name, description, amount, value, photo, is_bomstar, is_social }: ProductRequest) {

        if (!name || !description || !amount || !value || !photo) {
            throw new Error("Nome, Descrição, Foto, Valor e Estoque são obrigatórios")
        }

        const s3Storage = new S3Storage()

        const upload = await s3Storage.saveFile(photo)

        const product = await prismaClient.product.create({
            data: {
                name: name,
                description: description,
                value: value,
                is_bomstar: is_bomstar,
                is_social: is_social,
                amount: amount,
                photo: upload
            },
        })

        return (product)
    }
}

export { CreateProductService }