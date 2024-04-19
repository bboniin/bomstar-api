import { compare, hash } from 'bcryptjs';
import prismaClient from '../../prisma'

interface UserRequest {
    old_password: string;
    new_password: string;
    user_id: string;
}

class EditPasswordUserService {
    async execute({ old_password, new_password, user_id }: UserRequest) {

        if (!old_password || !new_password) {
            throw new Error("Antiga e Nova Senha são obrigatórios")
        }
        
        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id,
            }
        })

        const passwordMatch = await compare(old_password, user.password)

        if (passwordMatch) {
            throw new Error("Senha antiga está incorreta")
        }

        const passwordHash = await hash(new_password, 8)

        const userEdit = await prismaClient.user.update({
            where: {
                id: user_id,
            },
            data: {
                password: passwordHash
            }
        })

        return (userEdit)
    }
}

export { EditPasswordUserService }