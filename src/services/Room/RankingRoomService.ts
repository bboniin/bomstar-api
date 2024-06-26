import { endOfMonth, startOfMonth } from 'date-fns';
import prismaClient from '../../prisma'

interface RoomRequest {
    room_id: string;
}

class RankingRoomService {
    async execute({ room_id }: RoomRequest) {

        const users = await prismaClient.user.findMany({
            where: {
                room_id: room_id
            }
        })  

        const userIds = users.map(user => user.id);

        const transactions = await prismaClient.transaction.findMany({
            where: {
                OR: [{
                        type: "action",
                    },{
                        type: "bonus",
                    },{
                        type: "penalty",
                    },
                ],
                created_at: {
                    gte: startOfMonth(new Date()),
                    lte: endOfMonth(new Date()),
                },
                user_id: {
                    in: userIds,
                },
            }
        })  

        const userTransactionTotal = {};

        transactions.map(transaction => {
            const { user_id, value } = transaction;
            if (userTransactionTotal[user_id]) {
                if (transaction.type == "penalty") {
                    userTransactionTotal[user_id] -= value;
                } else {
                    userTransactionTotal[user_id] += value;
                }
            } else {
                if (transaction.type == "penalty") {
                    userTransactionTotal[user_id] = -value;
                } else {
                    userTransactionTotal[user_id] = value;
                }
            }
        });

        let rankedUsers = []
        
        users.map((item) => {
            item.points = userTransactionTotal[item.id] || 0
            rankedUsers.push(item)
        })
        
        rankedUsers.sort((a, b) => b["points"] - a["points"])

        return rankedUsers
    }
}

export { RankingRoomService }