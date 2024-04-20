import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface UserRequest {
    name: string;
    photo: string;
    phone_number: string;
    email: string;
    birthday: Date;
    user_id: string;
}

class EditUserService {
    async execute({ name, birthday, phone_number, photo, email, user_id }: UserRequest) {

        if (email) {
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
        }
        

        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id,
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        let data = {
            name: name || user.name,
            email: email || user.email,
            birthday: birthday ? new Date(birthday) : user.birthday,
            phone_number: phone_number || user.phone_number
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

export { EditUserService }