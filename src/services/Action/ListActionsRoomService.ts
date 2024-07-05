import prismaClient from '../../prisma'

interface ActionRequest {
    page: number;
    room_id: string;
}

class ListActionsRoomService {
    async execute({ page, room_id }: ActionRequest) {

        const actionsTotal = await prismaClient.roomAction.count({
            where: {
                room_id: room_id,
            }
        })

        const actions = await prismaClient.roomAction.findMany({
            where: {
                room_id: room_id,
            },
            skip: page * 30,
            take: 30,
            orderBy: {
                created_at: "desc"
            }
        })

        return {actions, actionsTotal}
    }
}

export { ListActionsRoomService }