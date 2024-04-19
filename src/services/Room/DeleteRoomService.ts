import prismaClient from '../../prisma'

interface RoomRequest {
    room_id: string;
}

class DeleteRoomService {
    async execute({ room_id }: RoomRequest) {

        const users = await prismaClient.user.count({
            where: {
                room_id: room_id,
            }
        })

        if (users) {
            throw new Error("Retire todos os usuários da sala para poder deletar")
        }

        const room = await prismaClient.room.delete({
            where: {
                id: room_id,
            }
        })

        return (room)
    }
}

export { DeleteRoomService }