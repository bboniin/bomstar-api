import prismaClient from '../../prisma'

interface RescueRequest {
    amount: number;
    product_id: string;
    user_id: string;
}

class CreateRescueService {
    async execute({ user_id, product_id, amount }: RescueRequest) {

        if (!amount || !product_id || !user_id) {
            throw new Error("Nome, Email, Senha, Aniversário e Telefone são obrigatórios")
        }

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        const product = await prismaClient.product.findFirst({
            where: {
                id: product_id
            }
        })

        if (!product) {
            throw new Error("Produto não encontrado")
        }

        if (user.points - (amount * product.value) < 0) {
            throw new Error("Pontos insuficientes para resgate") 
        }

        await prismaClient.transaction.create({
            data: {
                value: amount * product.value,
                type: "rescue",
                operation: "saida",
                description: `Resgate de Produto`,
                user_id: user.id
            }
        })

        await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                points: user.points - (amount * product.value)
            }
        })

        await prismaClient.product.update({
            where: {
                id: product.id
            },
            data: {
                amount: product.amount - amount
            }
        })

        const rescue = await prismaClient.rescue.create({
            data: {
                product_id: product_id,
                user_id: user_id,
                amount: amount,
                value: amount * product.value
            }
        })

        return rescue
    }
}

export { CreateRescueService }