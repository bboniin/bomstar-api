import prismaClient from '../../prisma'

interface InteractionRequest {
    name: string;
    description: string;
    reward: number;
    room_id: string;
}

class CreateInteractionService {
    async execute({ name, description, reward, room_id}: InteractionRequest) {

        if (!name || !reward || !room_id) {
            throw new Error("Nome, Descrição, Sala e Recompensa são obrigatórios")
        }

        const room = await prismaClient.room.findUnique({
            where: {
                id: room_id
            },
        })

        if (!room) {
            throw new Error("Sala não encontrada")
        }

        const interaction = await prismaClient.roomInteraction.create({
            data: {
                name: name,
                description: description,
                reward: reward,
                room_id: room_id
            }
        })

        return (interaction)
    }
}

export { CreateInteractionService }