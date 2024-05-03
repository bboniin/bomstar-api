import prismaClient from '../../prisma'

interface TrunkRequest {
    user_id: string;
    trunk_id: string;
}

class RescueTrunkService {
    async execute({ user_id, trunk_id }: TrunkRequest) {

        if (!user_id || !trunk_id) {
            throw new Error("Id do Baú e do Usuário são obrigatórios")
        }

        const trunk = await prismaClient.trunk.findFirst({
            where: {
                id: trunk_id,
                open: false
            },
            include: {
                user: true,
            }
        })

        if (!trunk) {
            throw new Error("Baú não encontrado")
        }
        
        if (trunk.open) {
            throw new Error("Baú já foi aberto")
        }

        let rewards = trunk.rewards.split(",")
        let reward = parseInt(rewards[Math.floor(Math.random() * rewards.length)])

        if (reward) {
            await prismaClient.transaction.create({
            data: {
                value: reward,
                type: "trunk",
                operation: "entrada",
                description: `Premiação abertura de baú`,
                user_id: user_id
            }
            })
            await prismaClient.user.update({
                where: {
                    id: user_id
                },
                data: {
                    points: trunk.user.points + reward
                }
            })
        }

        const rescueEdit = await prismaClient.trunk.update({
            where: {
                id: trunk_id,
            },
            data: {
                reward: reward,
                updated_at: new Date(),
                open: true
            },
        })

        return (rescueEdit)
    }
}

export { RescueTrunkService }