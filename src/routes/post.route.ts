import { Router } from 'express';

import { PostController } from '@controllers';

// Init shared
const router = Router();

const postController = new PostController();
router.get('/top', postController.getAllPosts);

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
