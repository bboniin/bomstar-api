import prismaClient from '../../prisma'

interface InteractionRequest {
    interaction_id: string;
}

class DeleteInteractionService {
    async execute({ interaction_id }: InteractionRequest) {

        const interaction = await prismaClient.roomInteraction.delete({
            where: {
                id: interaction_id,
            }
        })

        return (interaction)
    }
}

export { DeleteInteractionService }