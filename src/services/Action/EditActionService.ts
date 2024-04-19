import prismaClient from '../../prisma'

interface ActionRequest {
    name: string;
    action_id: string;
    description: string;
    reward: number;
}

class EditActionService {
    async execute({ name, action_id, description, reward }: ActionRequest) {

        
        if (!name  || !description || !reward || !action_id) {
            throw new Error("Nome, Descrição, Id e Recompensa são obrigatórios")
        }

        const action = await prismaClient.roomAction.update({
            where: {
                id: action_id
            },
            data: {
                name: name,
                description: description,
                reward: reward
            }
        })

        return (action)
    }
}

export { EditActionService }