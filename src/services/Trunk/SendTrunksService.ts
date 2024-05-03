import prismaClient from '../../prisma'

interface RescueRequest {
    description: string;
    name: string;
    rewards: string;
    users: Array<string>;
}

class SendTrunksService {
    async execute({ name, description, rewards, users }: RescueRequest) {

        let arrayRewards = rewards.split(",")

        if (!name || !arrayRewards.length || !users.length) {
            throw new Error("Nome, Possiveis recompensas e Usuários são obrigatórios")
        }
        if (arrayRewards.length < 3) {
            throw new Error("Insira no mínimo três premiações para avançar") 
        }
        
        await Promise.all(users.map(async (item) => {
            await prismaClient.trunk.create({
                data: {
                    rewards: rewards,
                    user_id: item,
                    description: description,
                    name: name,
                    reward: 0,
                    open: false
                }
            })
        }))

        return "Baús enviados com sucesso"
    }
}

export { SendTrunksService }