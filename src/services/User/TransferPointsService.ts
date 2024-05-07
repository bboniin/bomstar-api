import prismaClient from '../../prisma'

interface TransferRequest {
    user_receive_id: string;
    user_send_id: string;
    value: number;
}

class TransferPointsService {
    async execute({ user_receive_id, user_send_id, value }: TransferRequest) {
        
        if (!user_receive_id || !user_send_id || !value) {
            throw new Error("Id do Usuário que vai enviar, receber e valor são obrigatórios")
        }
        
        const userSend = await prismaClient.user.findUnique({
            where: {
                id: user_send_id
            },
        })

        if (!userSend) {
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

        if (value > userSend.points) {
            throw new Error("Pontos insuficientes para transferencia")
        }


        await prismaClient.user.update({
            where: {
                id: userSend.id
            },
            data: {
                points: userSend.points - value
            }
        })

        await prismaClient.transaction.create({
            data: {
                value: value,
                type: "transfer",
                operation: "saida",
                description: `Transferencia de pontos`,
                user_id: userSend.id
            }
        })

        await prismaClient.user.update({
            where: {
                id: userReceive.id
            },
            data: {
                points: userReceive.points + value
            }
        })

        await prismaClient.transaction.create({
            data: {
                value: value,
                type: "transfer",
                operation: "entrada",
                description: `Transferencia de pontos`,
                user_id: userReceive.id
            }
        })

        return "Transferencia realizada com sucesso"
    }
}

export { TransferPointsService }