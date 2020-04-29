import { Request, Response, Router } from 'express';
import PostRouter from './post.route';
import CommentRouter from './comment.route';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/posts', PostRouter);
router.use('/comments', CommentRouter);
router.get('/pulse', async (req: Request, res: Response) => {
    return res.status(200).json({ data: "asss" });
})

// Export the base-router
export default router;
