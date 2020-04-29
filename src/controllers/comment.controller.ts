import { Request, Response, Router, NextFunction } from 'express';
import { BAD_REQUEST, CREATED, OK, NO_CONTENT } from 'http-status-codes';
import { ApiService } from '@shared/services';
import { Comment } from '@shared/interfaces';

export class CommentController {

    public async searchComments(req: Request, res: Response, next: NextFunction): Promise<any> {
        const q = req.query.q || '';

        const apiService = new ApiService();

        try {
            const allComments = await apiService.getComments();

            if (!allComments || !allComments.length) {
                return res.status(NO_CONTENT).send();
            }

            const fields = Object.keys(allComments[0]);
            const filteredComments: { [key: string]: Comment } = {};
            for (const comment of allComments) {
                for (const field of fields) {
                    if ((comment as any)[field] == q) {
                        // Check if comment is already added
                        if (!filteredComments[comment.id]) {
                            filteredComments[comment.id] = comment;
                        }
                    }
                }
                break;
            }
            res.status(OK).json({ data: Object.values(filteredComments), meta: null });
            return;
        } catch (error) {
            return next(error);
        }
    }
}