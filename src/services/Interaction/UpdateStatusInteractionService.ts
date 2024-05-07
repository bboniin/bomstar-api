import prismaClient from '../../prisma'

interface InteractionRequest {
    interaction_id: string;
    status: string;
    response: string;
    user_id: string;
}

class UpdateStatusInteractionService {
    async execute({ status, response, user_id, interaction_id }: InteractionRequest) {
        
        if (!status || !interaction_id) {
            throw new Error("Id e Status são obrigatórios")
        }

        if (status != "aceita" && status != "recusada") {
            throw new Error("Status inválido")
        }

        const interaction = await prismaClient.interaction.findFirst({
            where: {
                id: interaction_id,
                status: "pendente"
            },
            include: {
                user_send: true,
                user_receive: true
            }
        })

        if (!interaction) {
            throw new Error("Interação não existe ou já foi respondida")
        }

        if (interaction.user_receive.id != user_id) {
            throw new Error("Interação não pertence a esta usuário")
        }

        if (status == "aceita") {
            await prismaClient.user.update({
                where: {
                    id: interaction.user_send.id
                },
                data: {
                    points_interactions: interaction.user_send.points_interactions + interaction.reward
                }
            })
            await prismaClient.user.update({
                where: {
                    id: interaction.user_receive.id
                },
                data: {
                    points_interactions: interaction.user_receive.points_interactions + interaction.reward
                }
            })
        } 

        const actionResponse = await prismaClient.interaction.update({
            where: {
                id: interaction_id,
            },
            data: {
                status: status,
                response: response,
                updated_at: new Date()
            },
        })

        return (actionResponse)
    }
}

export { UpdateStatusInteractionService }