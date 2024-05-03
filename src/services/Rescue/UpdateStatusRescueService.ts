import prismaClient from '../../prisma'

interface RescueRequest {
    status: string;
    rescue_id: string;
    observation: string;
}

class UpdateStatusRescueService {
    async execute({ status, observation, rescue_id }: RescueRequest) {

        if (!status || !rescue_id) {
            throw new Error("Status e Resgate são obrigatórios")
        }

        if (status != "aprovado" && status != "reprovado") {
            throw new Error("Status inválido")
        }

        const rescue = await prismaClient.rescue.findUnique({
            where: {
                id: rescue_id,
            },
            include: {
                user: true,
                product: true
            }
        })

        let data = {
            status: status,
            observation: observation
        }

        if (!rescue) {
            throw new Error("Resgate não encontrado")
        }
        
        if (rescue.status != "pendente") {
            throw new Error("Resgate já foi atualizado")
        }

        const rescueEdit = await prismaClient.rescue.update({
            where: {
                id: rescue_id,
            },
            data: data,
            include: {
                product: true,
                user: true
            }
        })

        if (status == "reprovado") {
            await prismaClient.transaction.create({
                data: {
                    value: rescue.value,
                    type: "rescue",
                    operation: "entrada",
                    description: `Estorno Resgate de Produto`,
                    user_id: rescue.user.id
                }
            })
            await prismaClient.user.update({
                where: {
                    id: rescue.user.id
                },
                data: {
                    points: rescue.user.points + rescue.value
                }
            })
            await prismaClient.product.update({
                where: {
                    id: rescue.product.id
                },
                data: {
                    amount: rescue.product.amount + rescue.amount
                }
            })
        }

        return (rescueEdit)
    }
}

export { UpdateStatusRescueService }