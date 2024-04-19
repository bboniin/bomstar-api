import { compare } from 'bcryptjs';
import prismaClient from '../../prisma'

interface UserRequest {
    user_id: string;
    password: string;
}

class DeleteUserService {
    async execute({ password, user_id }: UserRequest) {

        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id,
            }
        })

        const passwordMatch = await compare(password, user.password)

        if (passwordMatch) {
            throw new Error("Senha está incorreta")
        }
        
        const userDelete = await prismaClient.user.delete({
            where: {
                id: user_id,
            }
        })

        return (userDelete)
    }
}

export { DeleteUserService }