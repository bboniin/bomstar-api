import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ActionRequest {
    user_id: string;
    action_id: string;
    observation: string;
    photo: string;
}

class SendActionService {
    async execute({ user_id, observation, action_id, photo}: ActionRequest) {

        if (!user_id  || !action_id ) {
            throw new Error("Id do Usuário e da Ação são obrigatórios")
        }

        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id
            },
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        const roomAction = await prismaClient.roomAction.findFirst({
            where: {
                id: action_id,
                room_id: user.room_id
            },
        })

        if (!roomAction) {
            throw new Error("Ação não encontrada")
        }
        
        let data = {
            name: roomAction.name,
            reward: roomAction.reward,
            user_id: user.id,
            description: roomAction.description,
            observation: observation

        }
        
        if (photo) {
            const s3Storage = new S3Storage()

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        }

        const action = await prismaClient.action.create({
            data: data
        })

        return (action)
    }
}

export { SendActionService }