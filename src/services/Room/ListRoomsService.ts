import prismaClient from '../../prisma'

interface RoomRequest {
    page: number;
}

class ListRoomsService {
    async execute({ page }: RoomRequest) {

        const roomsTotal = await prismaClient.room.count()

        const rooms = await prismaClient.room.findMany({
            skip: page * 30,
            take: 30,
            orderBy: {
                created_at: "asc"
            },
            include: {
                room_actions: true,
                users: true
            }
        })

        return {rooms, roomsTotal}
    }
}

export { ListRoomsService }