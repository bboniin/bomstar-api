import { Router } from 'express'
import multer from 'multer'

import { isAuthenticated } from './middlewares/isAuthenticated'
import { isAdmin } from './middlewares/isAdmin'

import uploadConfig from './config/multer'

import { AuthUserController } from './controllers/User/AuthUserController'
import { CreateUserController } from './controllers/User/CreateUserController'
import { AdminEditUserController } from './controllers/User/AdminEditUserController'
import { EditUserController } from './controllers/User/EditUserController'
import { EditPasswordUserController } from './controllers/User/EditPasswordUserController'
import { GetUserController } from './controllers/User/GetUserController'
import { AdminGetUserController } from './controllers/User/AdminGetUserController'
import { AdminCreateUserController } from './controllers/User/AdminCreateUserController'
import { UpdateStatusUserController } from './controllers/User/UpdateStatusUserController'
import { ListUsersController } from './controllers/User/ListUsersController'
import { DeleteUserController } from './controllers/User/DeleteUserController'
import { GetPostController } from './controllers/Post/GetPostController'
import { ListPostsController } from './controllers/Post/ListPostsController'
import { CreatePostController } from './controllers/Post/CreatePostController'
import { EditPostController } from './controllers/Post/EditPostController'
import { DeletePostController } from './controllers/Post/DeletePostController'
import { GetRoomController } from './controllers/Room/GetRoomController'
import { ListRoomsController } from './controllers/Room/ListRoomsController'
import { CreateRoomController } from './controllers/Room/CreateRoomController'
import { EditRoomController } from './controllers/Room/EditRoomController'
import { ListActionsUserController } from './controllers/Action/ListActionsUserController'
import { ListActionsRoomController } from './controllers/Action/ListActionsRoomController'
import { ListActionsPendingController } from './controllers/Action/ListActionsPendingController'
import { ListUsersPendingController } from './controllers/User/ListUsersPendingController'
import { SendActionController } from './controllers/Action/SendActionController'
import { CreateActionController } from './controllers/Action/CreateActionController'
import { EditActionController } from './controllers/Action/EditActionController'
import { DeleteActionController } from './controllers/Action/DeleteActionController'
import { AuthAdminController } from './controllers/Admin/AuthAdminController'
import { CreateAdminController } from './controllers/Admin/CreateAdminController'
import { DeleteRoomController } from './controllers/Room/DeleteRoomController'
import { ListProductsController } from './controllers/Product/ListProductsController'
import { CreateProductController } from './controllers/Product/CreateProductController'
import { EditProductController } from './controllers/Product/EditProductController'
import { DeleteProductController } from './controllers/Product/DeleteProductController'
import { RankingRoomController } from './controllers/Room/RankingRoomController'
import { UpdateStatusActionController } from './controllers/Action/UpdateStatusActionController'
import { ListTransactionsController } from './controllers/Transactions/ListTransactionsController'
import { ListTransactionsUserController } from './controllers/Transactions/ListTransactionsUserController'
import { ListRescuesController } from './controllers/Rescue/ListRescuesController'
import { CreateRescueController } from './controllers/Rescue/CreateRescueController'
import { UpdateStatusRescueController } from './controllers/Rescue/UpdateStatusRescueController'
import { ListRescuesPendingController } from './controllers/Rescue/ListRescuesPendingController'
import { ListRescuesUserController } from './controllers/Rescue/ListRescuesUserController'
import { BirthdayUsersController } from './controllers/User/BirthdayUsersController'
import { HomeAdminController } from './controllers/Admin/HomeAdminController'
import { ListTrunksController } from './controllers/Trunk/ListTrunksController'
import { RescueTrunkController } from './controllers/Trunk/RescueTrunkController'
import { SendTrunksController } from './controllers/Trunk/SendTrunksController'
import { ListTrunksUserController } from './controllers/Trunk/ListTrunksUserController'
import { SendInteractionController } from './controllers/Interaction/SendInteractionController'
import { ListInteractionsRoomController } from './controllers/Interaction/ListInteractionsRoomController'
import { ListInteractionsUserController } from './controllers/Interaction/ListInteractionsUserController'
import { CreateInteractionController } from './controllers/Interaction/CreateInteractionController'
import { EditInteractionController } from './controllers/Interaction/EditInteractionController'
import { DeleteInteractionController } from './controllers/Interaction/DeleteInteractionController'
import { ListInteractionsController } from './controllers/Interaction/ListInteractionsController'
import { LastedInteractionUserController } from './controllers/Interaction/LastedInteractionUserController'
import { CreateBonusController } from './controllers/BonusAndPenalty/CreateBonusController'
import { CreatePenaltyController } from './controllers/BonusAndPenalty/CreatePenaltyController'
import { ListPenaltiesUserController } from './controllers/BonusAndPenalty/ListPenaltiesUserController'
import { ListBonusesUserController } from './controllers/BonusAndPenalty/ListBonusesUserController'
import { TransferPointsController } from './controllers/User/TransferPointsController'
import { UpdateStatusInteractionController } from './controllers/Interaction/UpdateStatusInteractionController'

const upload = multer(uploadConfig)

const router = Router()

router.post('/session', new AuthUserController().handle)
router.post('/session-admin', new AuthAdminController().handle)
router.post('/user', upload.single("file"), new CreateUserController().handle)

router.post('/admin', upload.single("file"), new CreateAdminController().handle)

router.use(isAuthenticated)

router.get('/user', new GetUserController().handle)
router.put('/user', upload.single("file"), new EditUserController().handle)
router.delete('/user', new DeleteUserController().handle)
router.put('/password', new EditPasswordUserController().handle)

router.get('/post/:post_id', new GetPostController().handle)
router.get('/posts', new ListPostsController().handle)

router.get('/actions', new ListActionsUserController().handle)
router.get('/actions-room', new ListActionsRoomController().handle)
router.post('/send-action', upload.single("file"), new SendActionController().handle)

router.get('/lasted-interaction', new LastedInteractionUserController().handle)
router.get('/interactions', new ListInteractionsUserController().handle)
router.get('/interactions-room', new ListInteractionsRoomController().handle)
router.post('/send-interaction', upload.single("file"), new SendInteractionController().handle)
router.put('/status-interaction/:interaction_id', new UpdateStatusInteractionController().handle)

router.post('/rescue', new CreateRescueController().handle)

router.get('/room/:room_id', new GetRoomController().handle)
router.get('/ranking/:room_id', new RankingRoomController().handle)
router.get('/products', new ListProductsController().handle)
router.get('/transactions', new ListTransactionsUserController().handle)
router.get('/rescues', new ListRescuesUserController().handle)

router.get('/trunks', new ListTrunksUserController().handle)
router.put('/trunk/:trunk_id', new RescueTrunkController().handle)

router.get('/bonuses', new ListBonusesUserController().handle)
router.get('/penalties', new ListPenaltiesUserController().handle)

router.use(isAdmin)

router.post('/transfer', new TransferPointsController().handle)
router.post('/bonus', new CreateBonusController().handle)
router.post('/penalty', new CreatePenaltyController().handle)

router.get('/home', new HomeAdminController().handle)
router.get('/trunks-admin', new ListTrunksController().handle)
router.post('/trunks', new SendTrunksController().handle)

router.get('/admin-post/:post_id', new GetPostController().handle)
router.get('/admin-posts', new ListPostsController().handle)

router.get('/users', new ListUsersController().handle)
router.get('/users-pending', new ListUsersPendingController().handle)
router.delete('/user/:user_id', new DeleteUserController().handle)
router.get('/user/:user_id', new AdminGetUserController().handle)
router.put('/edit-user/:user_id', upload.single("file"), new AdminEditUserController().handle)
router.post('/create-user', upload.single("file"),  new AdminCreateUserController().handle)
router.put('/status-user/:user_id', new UpdateStatusUserController().handle)

router.get('/birthdays', new BirthdayUsersController().handle)

router.post('/post', upload.single("file"), new CreatePostController().handle)
router.put('/post/:post_id', upload.single("file"), new EditPostController().handle)
router.delete('/post/:post_id', new DeletePostController().handle)

router.get('/rooms', new ListRoomsController().handle)
router.post('/room', new CreateRoomController().handle)
router.put('/room/:room_id', new EditRoomController().handle)
router.delete('/room/:room_id', new DeleteRoomController().handle)

router.post('/product', upload.single("file"), new CreateProductController().handle)
router.put('/product/:product_id', upload.single("file"), new EditProductController().handle)
router.delete('/product/:product_id', new DeleteProductController().handle)

router.post('/action-room', new CreateActionController().handle)
router.put('/action-room/:action_id', new EditActionController().handle)
router.delete('/action-room/:action_id', new DeleteActionController().handle)

router.get('/admin-interactions', new ListInteractionsController().handle)
router.post('/interaction-room', new CreateInteractionController().handle)
router.put('/interaction-room/:interaction_id', new EditInteractionController().handle)
router.delete('/interaction-room/:interaction_id', new DeleteInteractionController().handle)

router.get('/admin-transactions', new ListTransactionsController().handle)

router.get('/actions-pending', new ListActionsPendingController().handle)
router.put('/status-action/:action_id', new UpdateStatusActionController().handle)

router.get('/rescues-pending', new ListRescuesPendingController().handle)
router.put('/status-rescue/:rescue_id', new UpdateStatusRescueController().handle)


export { router }