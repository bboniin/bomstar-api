import { endOfDay, startOfDay } from 'date-fns';
import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface InteractionRequest {
    user_id: string;
    user_receive_id: string;
    interaction_id: string;
    observation: string;
    photo: string;
}

class SendInteractionService {
    async execute({ user_id, observation, interaction_id, user_receive_id, photo}: InteractionRequest) {

        if (!user_id || !user_receive_id  || !interaction_id ) {
            throw new Error("Ids dos Usuários e da Interação são obrigatórios")
        }

        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id
            },
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        const userReceive = await prismaClient.user.findUnique({
            where: {
                id: user_receive_id
            },
        })

        if (!userReceive) {
            throw new Error("Usuário não encontrado")
        }

        const roomInteraction = await prismaClient.roomInteraction.findFirst({
            where: {
                id: interaction_id,
                room_id: user.room_id
            },
        })

        if (!roomInteraction) {
            throw new Error("Interação não encontrada")
        }
        
        const interactionSend = await prismaClient.interaction.findFirst({
            where: {
                user_send_id: user_id,
                created_at: {
                    gte: startOfDay(new Date()), 
                    lte: endOfDay(new Date()),
                }
            },
            orderBy: {
                created_at: "desc"
            },
        })

        if (interactionSend) {
            throw new Error("Interação de hoje já foi enviada")
        }

        let data = {
            name: roomInteraction.name,
            description: roomInteraction.description,
            reward: roomInteraction.reward,
            user_send_id: user.id,
            user_receive_id: userReceive.id,
            observation: observation

        }
        
        if (photo) {
            const s3Storage = new S3Storage()

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        }

        const interaction = await prismaClient.interaction.create({
            data: data
        })

        return (interaction)
    }
}

export { SendInteractionService }