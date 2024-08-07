import prismaClient from '../../prisma'

interface RoomRequest {
    page: number;
    all: boolean;
}

class ListRoomsService {
    async execute({ page, all }: RoomRequest) {

        let filter = {}

        if (!all) {
            filter["skip"] = page * 30
            filter["take"] = 30
        }

        const roomsTotal = await prismaClient.room.count()

        const rooms = await prismaClient.room.findMany({
            ...filter,
            orderBy: {
                created_at: "desc"
            },
            include: {
                room_actions: true,
                room_interactions: true,
                users: {
                    orderBy: {
                        name: "asc"
                    },
                }
            }
        })

        return {rooms, roomsTotal}
    }
}

export { ListRoomsService }