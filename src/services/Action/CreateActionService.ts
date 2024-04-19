import prismaClient from '../../prisma'

interface ActionRequest {
    name: string;
    description: string;
    reward: number;
    room_id: string;
}

class CreateActionService {
    async execute({ name, description, reward, room_id}: ActionRequest) {

        if (!name  || !description || !reward || !room_id) {
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

        const action = await prismaClient.roomAction.create({
            data: {
                name: name,
                description: description,
                reward: reward,
                room_id: room_id
            }
        })

        return (action)
    }
}

export { CreateActionService }