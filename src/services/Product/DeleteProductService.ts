import prismaClient from '../../prisma'

interface ProductRequest {
    product_id: string;
}

class DeleteProductService {
    async execute({ product_id }: ProductRequest) {

        const productDelete = await prismaClient.product.update({
            where: {
                id: product_id,
            },
            data: {
                visible: false
            }
        })

        return (productDelete)
    }
}

export { DeleteProductService }