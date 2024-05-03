import { differenceInDays, differenceInYears, endOfDay } from 'date-fns';
import prismaClient from '../../prisma'

class BirthdayUsersService {
    async execute() {

        const users = await prismaClient.user.findMany({
            where: {
                status: "aprovado"
            },
            orderBy: {
                created_at: "asc"
            }
        })

        const today = endOfDay(new Date());
        
        const birthdays = users.filter(user => {
            user.birthday = endOfDay(user.birthday)
            const userBirthdayThisYear = endOfDay(new Date(today.getFullYear(), user.birthday.getMonth(), user.birthday.getDate()));
            user["year"] = differenceInYears(today, user.birthday)
            user["interval"] = differenceInDays(userBirthdayThisYear, today)
            
            return user["interval"] >= 0 && user["interval"] < 31
        }).sort((a, b) => {
            return a["interval"] - b["interval"];
          });
          
        
        
        return (birthdays)
    }
}

export { BirthdayUsersService }