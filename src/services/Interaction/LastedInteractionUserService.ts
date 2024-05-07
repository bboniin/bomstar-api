import { endOfDay, format, startOfDay } from 'date-fns';
import prismaClient from '../../prisma'

interface InteractionRequest {
    user_id: string;
}

class LastedInteractionUserService {
    async execute({ user_id }: InteractionRequest) {

        const interaction = await prismaClient.interaction.findFirst({
            where: {
                OR: [{
                    status: "pendente",
                },{
                    status: "recusada",
                }],
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

        console.log(format(new Date(), "dd/MM/yyyy HH:mm"))

        return interaction
    }
}

export { LastedInteractionUserService }