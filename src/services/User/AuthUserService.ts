import prismaClient from '../../prisma'
import { sign } from 'jsonwebtoken'
import authConfig from "./../../utils/auth"
import { compare } from 'bcryptjs';

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {

        if (!password || !email) {
            throw new Error("Email e Senha são obrigatórios")
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Email e Senha não correspondem ou não existe")
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email e Senha não correspondem ou não existe")
        }

        const token = sign({
            email: user.email,
            type: "user"
        }, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: '365d'
        })

        return ({
            id: user.id,
            name: user.name,
            points: user.points,
            email: user.email,
            photo: user.photo,
            birthday: user.birthday,
            phone_number: user.phone_number,
            status: user.status,
            token: token,
            photo_url: user.photo ? "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + user.photo : ""
        })
    }
}

export { AuthUserService }