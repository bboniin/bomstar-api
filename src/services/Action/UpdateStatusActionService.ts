import prismaClient from '../../prisma'

interface UserRequest {
    action_id: string;
    status: string;
    response: string;
}

class UpdateStatusActionService {
    async execute({ status, response, action_id }: UserRequest) {
        
        if (!status || !action_id) {
            throw new Error("Id e Status são obrigatórios")
        }

        if (status != "aprovado" && status != "reprovado") {
            throw new Error("Status inválido")
        }

        const action = await prismaClient.action.findFirst({
            where: {
                id: action_id,
                status: "pendente"
            },
            include: {
                user: true
            }
        })

        if (!action) {
            throw new Error("Ação não existe ou já foi respondida")
        }

        if (status == "aprovado") {
            await prismaClient.transaction.create({
                data: {
                    value: action.reward,
                    type: "action",
                    operation: "entrada",
                    description: `Realização de Ação`,
                    user_id: action.user.id
                }
            })
            await prismaClient.user.update({
                where: {
                    id: action.user.id
                },
                data: {
                    points: action.user.points + action.reward
                }
            })
        } 

        const actionResponse = await prismaClient.action.update({
            where: {
                id: action_id,
            },
            data: {
                status: status,
                response: response,
                updated_at: new Date()
            },
        })

        return (actionResponse)
    }
}

export { UpdateStatusActionService }