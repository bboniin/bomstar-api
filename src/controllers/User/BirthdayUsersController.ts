import { Request, Response } from 'express';
import { BirthdayUsersService } from '../../services/User/BirthdayUsersService';

class BirthdayUsersController {
    async handle(req: Request, res: Response) {

        const {page, all} = req.query

        const birthdayUsersService = new BirthdayUsersService

        const birthdays = await birthdayUsersService.execute()

        birthdays.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(birthdays)
    }
}

export { BirthdayUsersController }