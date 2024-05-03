import prismaClient from '../../prisma'

interface ProductRequest {
    page: number;
    user_id: string;
}

class ListProductsService {
    async execute({ page, user_id }: ProductRequest) {

        let filter = {}

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id,
                status: "aprovado"
            },
            include: {
                room: true
            }
        })

        if (user) {
            if (user.room.is_social) {
                filter = {
                    where: {
                        is_social: true,
                        visible: true
                    }
                }
            } else {
                filter = {
                    where: {
                        is_bomstar: true,
                        visible: true
                    }
                }
            }
        } else {
            filter = {
                where: {
                    visible: true
                },
                skip: page * 1,
                take: 1,
            }
        }

        const productsTotal = await prismaClient.product.count({
            where: filter["where"] || {}
        })

        const products = await prismaClient.product.findMany({
            ...filter,
            orderBy: {
                created_at: "asc"
            }
        })

        return ({products, productsTotal})
    }
}

export { ListProductsService }