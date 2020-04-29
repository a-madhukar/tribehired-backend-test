import { Router } from 'express';
import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';
import { CommentController } from '@controllers';

// Init shared
const router = Router();

const validator = createValidator();

const searchCommentQuerySchema = Joi.object({
    q: Joi.string().min(1).max(500).required(),
});

const commentController = new CommentController();
router.get('/search', validator.query(searchCommentQuerySchema), commentController.searchComments);

export default router;