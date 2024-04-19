import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface UserRequest {
    name: string;
    photo: string;
    phone_number: string;
    email: string;
    observation: string;
    room_id: string;
    birthday: Date;
    user_id: string;
}

class AdminEditUserService {
    async execute({ name, birthday, observation, phone_number, room_id, photo, email, user_id }: UserRequest) {

        if (!name || !phone_number || !email || !birthday || !room_id) {
            throw new Error("Nome, Email, Aniversário, Telefone e Sala são obrigatórios")
        }
        
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            if (userAlreadyExists.id != user_id) {
                throw new Error("Email já cadastrado")
            }
        }

        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id,
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }
        
        if (user.status == "excluido") {
            throw new Error("Usuário já foi deleto")
        }

        let data = {
            name: name,
            email: email,
            birthday: new Date(birthday),
            room_id: room_id,
            phone_number: phone_number,
            observation: observation
        }

        if (photo) {
            const s3Storage = new S3Storage()

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload

            if (user.photo) {
                await s3Storage.deleteFile(user.photo)
            }
        }

        const userEdit = await prismaClient.user.update({
            where: {
                id: user_id,
            },
            data: data,
        })

        return (userEdit)
    }
}

export { AdminEditUserService }