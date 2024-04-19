import prismaClient from '../../prisma'

interface ActionRequest {
    action_id: string;
}

class DeleteActionService {
    async execute({ action_id }: ActionRequest) {

        const action = await prismaClient.roomAction.delete({
            where: {
                id: action_id,
            }
        })

        return (action)
    }
}

export { DeleteActionService }