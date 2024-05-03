import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ProductRequest {
    name: string;
    photo: string;
    product_id: string;
    description: string;
    amount: number;
    value: number;
    is_bomstar: boolean;
    is_social: boolean;
}

class EditProductService {
    async execute({ name, description, amount, value, photo, is_bomstar, is_social, product_id }: ProductRequest) {

        
        if (!product_id || !name || !description || !amount || !value) {
            throw new Error("Nome, Descrição, Foto, Valor, Id do Produto e Estoque são obrigatórios")
        }

        const product = await prismaClient.product.findUnique({
            where: {
                id: product_id,
            }
        })

        if (!product) {
            throw new Error("Produto não encontrado")
        }

        let data = {
            name: name,
            value: value,
            amount: amount,
            description: description,
            is_bomstar: is_bomstar,
            is_social: is_social,
        }

        if (photo) {
            const s3Storage = new S3Storage()

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload

            if (product.photo) {
                await s3Storage.deleteFile(product.photo)
            }
        }

        const productEdit = await prismaClient.product.update({
            where: {
                id: product_id,
            },
            data: data,
        })

        return (productEdit)
    }
}

export { EditProductService }