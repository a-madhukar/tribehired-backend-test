import { get } from 'request-promise-native';
import { Comment, Post } from '@shared/interfaces';

export class ApiService {
    private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

    public async getComments(): Promise<Comment[]> {
        const urlPath = `${this.baseUrl}/comments`
        const data = await get(urlPath);

        if (!data) {
            return [];
        }
        return JSON.parse(data) as Comment[];
    }

    public async getPosts(): Promise<Post[]> {
        const urlPath = `${this.baseUrl}/posts`;
        const data = await get(urlPath);
        
        if (!data) {
            return [];
        }
        return JSON.parse(data) as Post[];
    }

    public async getPostById(id: string): Promise<Post | null> {
        const urlPath = `${this.baseUrl}/posts/${id}`;
        const data = await get(urlPath);

        if (!data) {
            return null;
        }
        return JSON.parse(data) as Post;
    }
}
