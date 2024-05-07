import prismaClient from '../../prisma'

interface InteractionRequest {
    page: number;
    room_id: string;
}

class ListInteractionsRoomService {
    async execute({ page, room_id }: InteractionRequest) {

        const interactionsTotal = await prismaClient.roomInteraction.count({
            where: {
                room_id: room_id,
            }
        })

        const interactions = await prismaClient.roomInteraction.findMany({
            where: {
                room_id: room_id,
            },
            skip: page * 30,
            take: 30,
            orderBy: {
                created_at: "asc"
            }
        })

        return {interactions, interactionsTotal}
    }
}

export { ListInteractionsRoomService }