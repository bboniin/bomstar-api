import prismaClient from '../../prisma'

interface RescueRequest {
    description: string;
    name: string;
    rewards: string;
    mode: string;
    users: Array<string>;
}

class SendTrunksService {
    async execute({ name, mode, description, rewards, users }: RescueRequest) {

        let arrayRewards = rewards.split(",")

        if (!name || !arrayRewards.length || !users.length) {
            throw new Error("Nome, Possiveis recompensas e Usuários são obrigatórios")
        }
        if (arrayRewards.length < 3) {
            throw new Error("Insira no mínimo três premiações para avançar") 
        }

        if(mode == "user"){
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
        }else{
            let filter = []
            users.map((item)=>{
                filter.push({
                    room_id: item
                })
            })
            
            const usersSend = await prismaClient.user.findMany({
                where: {
                    OR: filter
                }
            })

            await Promise.all(usersSend.map(async (item) => {
                await prismaClient.trunk.create({
                    data: {
                        rewards: rewards,
                        user_id: item.id,
                        description: description,
                        name: name,
                        reward: 0,
                        open: false
                    }
                })
            }))
        }
        
        

        return "Baús enviados com sucesso"
    }
}

export { SendTrunksService }