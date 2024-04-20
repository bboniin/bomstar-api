import prismaClient from '../../prisma'

interface UserRequest {
    status: string;
    user_id: string;
    observation: string;
    room_id: string;
}

class UpdateStatusUserService {
    async execute({ status, room_id, observation, user_id }: UserRequest) {

        if (!status || !user_id) {
            throw new Error("Status e Usuário são obrigatórios")
        }

        if (status != "aprovado" && status != "reprovado") {
            throw new Error("Status inválido")
        }

        if (status == "aprovado") {
            if (!room_id) {
                throw new Error("Sala do Usuário é obrigatório")
            }
        }

        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id,
            }
        })

        let data = {
            status: status,
            observation: observation || user.observation
        }
        if (status == "aprovado") {
            data["room_id"] = room_id
        }

        if (!user) {
            throw new Error("Usuário não encontrado")
        }
        
        if (user.status == "excluido") {
            throw new Error("Usuário já foi deleto")
        }

        const userEdit = await prismaClient.user.update({
            where: {
                id: user_id,
            },
            data: data
        })

        return (userEdit)
    }
}

export { UpdateStatusUserService }