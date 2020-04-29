import { Request, Response, Router, NextFunction } from 'express';
import { BAD_REQUEST, CREATED, OK, NO_CONTENT } from 'http-status-codes';
import { ApiService } from '@shared/services';
import { Comment, TopPost } from '@shared/interfaces';



export class PostController {

    public async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const apiService = new ApiService();
            const comments = await apiService.getComments();

            // Group all comments by postId
            // { postId: No of comments }
            const groupedComments = comments.reduce<{ [key: string]: number }>((result, curItem: Comment) => {
                if (!result[curItem.postId]) {
                    result[curItem.postId] = 0;
                }
                result[curItem.postId] += 1;
                return result;
            }, {});
            
            // Sort by length
            // Make comment list into a "tuple"
            const tuplePostComments = Object.keys(groupedComments).map((postId: string) => {
                return [postId, groupedComments[postId]];
            });

            // Sort by length
            tuplePostComments.sort((first: any, second: any) => {
                return second[1] - first[1];
            });

            const allPosts = await apiService.getPosts();

            const topPosts: TopPost[] = [];
            for (const postCommentTuple of tuplePostComments) {
                const post = allPosts.find(item => item.id === +postCommentTuple[0]);
                if (post) {
                    topPosts.push({
                        post_id: +postCommentTuple[0],
                        post_title: post.title,
                        post_body: post.body,
                        total_number_of_comments: postCommentTuple[1]
                    } as TopPost);
                }
            }

            res.status(OK).json({ data: topPosts, meta: null });
            return;
        } catch (error) {
            return next(error);
        }
    }
}
