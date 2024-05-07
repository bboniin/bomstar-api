import prismaClient from '../../prisma'

interface InteractionRequest {
    name: string;
    interaction_id: string;
    description: string;
    reward: number;
}

class EditInteractionService {
    async execute({ name, interaction_id, description, reward }: InteractionRequest) {

        
        if (!name  || !reward || !interaction_id) {
            throw new Error("Nome, Id e Recompensa são obrigatórios")
        }

        const interaction = await prismaClient.roomInteraction.update({
            where: {
                id: interaction_id
            },
            data: {
                name: name,
                description: description,
                reward: reward
            }
        })

        return (interaction)
    }
}

export { EditInteractionService }