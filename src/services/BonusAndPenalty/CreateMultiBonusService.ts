import prismaClient from '../../prisma'

interface InteractionRequest {
    name: string;
    description: string;
    value: number;
    users: Array<string>;
}

class CreateMultiBonusService {
    async execute({ name, description, value, users}: InteractionRequest) {

        if (!name || !value || !users.length ) {
            throw new Error("Nome, Descrição, Id dos Usuários e Valor são obrigatórios")
        }

        await Promise.all(users.map(async (item) => {
            const user = await prismaClient.user.findUnique({
                where: {
                    id: item
                },
            })
            
            await prismaClient.bonus.create({
                data: {
                    name: name,
                    description: description,
                    value: value,
                    user_id: item
                }
            })
    
            await prismaClient.transaction.create({
                data: {
                    value: value,
                    type: "bonus",
                    operation: "entrada",
                    description: `Bonificação`,
                    user_id: item
                }
            })
            
            await prismaClient.user.update({
                where: {
                    id: item
                },
                data: {
                    points: user.points + value
                }
            })
        }))

        return "Bonificações enviadas com sucesso"
    }
}

export { CreateMultiBonusService }