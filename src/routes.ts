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

const upload = multer(uploadConfig)

const router = Router()

router.post('/session', new AuthUserController().handle)
router.post('/session-admin', new AuthAdminController().handle)
router.post('/user', upload.single("file"), new CreateUserController().handle)

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

router.use(isAdmin)

router.post('/admin', upload.single("file"), new CreateAdminController().handle)

router.get('/admin-post/:post_id', new GetPostController().handle)
router.get('/admin-posts', new ListPostsController().handle)

router.get('/users', new ListUsersController().handle)
router.get('/users-pending', new ListUsersPendingController().handle)
router.delete('/user/:user_id', new DeleteUserController().handle)
router.get('/user/:user_id', new AdminGetUserController().handle)
router.put('/edit-user/:user_id', upload.single("file"), new AdminEditUserController().handle)
router.post('/create-user', upload.single("file"),  new AdminCreateUserController().handle)
router.put('/status-user/:user_id', new UpdateStatusUserController().handle)

router.post('/post', new CreatePostController().handle)
router.put('/post/:post_id', new EditPostController().handle)
router.delete('/post/:post_id', new DeletePostController().handle)

router.get('/room/:room_id', new GetRoomController().handle)
router.get('/rooms', new ListRoomsController().handle)
router.post('/room', new CreateRoomController().handle)
router.put('/room/:room_id', new EditRoomController().handle)
router.delete('/room/:room_id', new DeleteRoomController().handle)

router.post('/action-room', new CreateActionController().handle)
router.put('/action-room/:action_id', new EditActionController().handle)
router.delete('/action-room/:action_id', new DeleteActionController().handle)

router.get('/actions-pending', new ListActionsPendingController().handle)
router.put('/status-action/:action_id', new UpdateStatusUserController().handle)


export { router }