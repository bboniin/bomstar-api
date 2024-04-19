import { hash } from 'bcryptjs';
import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface UserRequest {
    name: string;
    photo: string;
    phone_number: string;
    email: string;
    password: string;
    birthday: Date;
}

class CreateUserService {
    async execute({ name, password, birthday, phone_number, photo, email }: UserRequest) {

        if (!name || !phone_number || !password || !email || !birthday) {
            throw new Error("Nome, Email, Senha, Aniversário e Telefone são obrigatórios")
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("Email já cadastrado")
        }

        const passwordHash = await hash(password, 8)

        let data = {
            name: name,
            email: email,
            password: passwordHash,
            birthday: birthday,
            phone_number: phone_number,
            points: 0,
            status: "pendente"
        }

        if (photo) {
            const s3Storage = new S3Storage()

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        }

        const user = await prismaClient.user.create({
            data: data,
            select: {
                name: true,
                email: true,
                phone_number: true,
                points: true,
                birthday: true,
                photo: true
            }
        })

        return (user)
    }
}

export { CreateUserService }