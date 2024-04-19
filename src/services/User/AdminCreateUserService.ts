import { hash } from 'bcryptjs';
import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface UserRequest {
    name: string;
    photo: string;
    phone_number: string;
    observation: string;
    email: string;
    password: string;
    room_id: string;
    birthday: Date;
}

class AdminCreateUserService {
    async execute({ name, room_id, password, birthday, phone_number, photo, observation, email }: UserRequest) {

        if (!name || !password || !email || !room_id) {
            throw new Error("Nome, Email, Senha e Sala são obrigatórios")
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
            birthday: new Date(birthday),
            phone_number: phone_number,
            observation: observation,
            room_id: room_id,
            points: 0,
            status: "aprovado"
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

export { AdminCreateUserService }