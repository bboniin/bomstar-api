import { hash } from 'bcryptjs';
import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface AdminRequest {
    name: string;
    photo: string;
    email: string;
    user_id: string;
    password: string;
}

class CreateAdminService {
    async execute({ name, password, user_id, photo, email }: AdminRequest) {

        if (user_id == "a75dc384-3596-4f5a-8648-f909e5e88087") {
            throw new Error("Apenas o Admin master pode criar novos admins")
        }

        if (!name || !password || !email) {
            throw new Error("Nome, Email e Senha são obrigatórios")
        }

        const adminAlreadyExists = await prismaClient.admin.findFirst({
            where: {
                email: email
            }
        })

        if (adminAlreadyExists) {
            throw new Error("Email já cadastrado")
        }

        const passwordHash = await hash(password, 8)

        let data = {
            name: name,
            email: email,
            password: passwordHash,
        }

        if (photo) {
            const s3Storage = new S3Storage()

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        }

        const admin = await prismaClient.admin.create({
            data: data,
            select: {
                name: true,
                email: true,
                photo: true
            }
        })

        return (admin)
    }
}

export { CreateAdminService }