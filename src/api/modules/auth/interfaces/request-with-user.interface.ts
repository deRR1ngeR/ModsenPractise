import { Request } from 'express';

import { UserResponse } from '../../users/response/user.response';

export default interface RequestWithUser extends Request {
    user: UserResponse
}