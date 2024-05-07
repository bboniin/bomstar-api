import prismaClient from '../../prisma'

interface InteractionRequest {
    name: string;
    description: string;
    value: number;
    user_id: string;
}

class CreatePenaltyService {
    async execute({ name, description, value, user_id}: InteractionRequest) {

        if (!name || !value || !user_id) {
            throw new Error("Nome, Descrição, Id do Usuário e Valor são obrigatórios")
        }

        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id
            },
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        const interaction = await prismaClient.penalty.create({
            data: {
                name: name,
                description: description,
                value: value,
                user_id: user_id
            }
        })

        await prismaClient.transaction.create({
            data: {
                value: value,
                type: "penalty",
                operation: "saida",
                description: `Penalização`,
                user_id: user_id
            }
        })
        
        await prismaClient.user.update({
            where: {
                id: user_id
            },
            data: {
                points: user.points - value
            }
        })

        return (interaction)
    }
}

export { CreatePenaltyService }