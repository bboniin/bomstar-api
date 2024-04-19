import prismaClient from '../../prisma'

interface UserRequest {
    action_id: string;
    status: string;
    response: string;
}

class UpdateStatusActionService {
    async execute({ status, response, action_id }: UserRequest) {
        
        if (!status || !action_id || !response) {
            throw new Error("Id, Status e Resposta são obrigatórios")
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
            // envio dos pontos para o usuário
        } 

        const actionResponse = await prismaClient.action.update({
            where: {
                id: action_id,
            },
            data: {
                status: status,
                response: response
            },
        })

        return (actionResponse)
    }
}

export { UpdateStatusActionService }