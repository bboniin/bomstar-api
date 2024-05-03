import prismaClient from '../../prisma'
import { differenceInDays, differenceInYears, endOfDay } from 'date-fns';

class HomeAdminService {
    async execute() {

        const rescuesPendingTotal = await prismaClient.rescue.count({
            where: {
                status: "pendente"
            },
        })

        const usersTotal = await prismaClient.user.findMany({
            where: {
                status: "aprovado"
            },
        })

        const usersPendingTotal = await prismaClient.user.count({
            where: {
                status: "pendente"
            },
        })

        const rescuesTotal = await prismaClient.rescue.count({
            where: {
                status: "pendente"
            },
        })

        const actionsTotal = await prismaClient.action.count({
            where: {
                status: "pendente"
            },
        })

        const roomsTotal = await prismaClient.room.count()
        const postsTotal = await prismaClient.post.count()
        const productsTotal = await prismaClient.product.count({
            where: {
                visible: true
            }
        })
        const today = endOfDay(new Date());
        
        const birthdays = usersTotal.filter(user => {
            user.birthday = endOfDay(user.birthday)
            const userBirthdayThisYear = endOfDay(new Date(today.getFullYear(), user.birthday.getMonth(), user.birthday.getDate()));
            user["interval"] = differenceInDays(userBirthdayThisYear, today)
            return user["interval"] >= 0 && user["interval"] < 31
        })

        return ({
            rescuesPendingTotal,
            usersTotal: usersTotal.length,
            usersPendingTotal,
            roomsTotal,
            productsTotal,
            postsTotal,
            rescuesTotal,
            actionsTotal,
            birthdaysTotal: birthdays.length
        })
    }
}

export { HomeAdminService }