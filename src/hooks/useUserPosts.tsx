import { useState, useEffect } from 'react';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    imageUrl?: string; // Optional field for image URL
}

const useUserPosts = (userId: number | null): Post[] => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (userId === null) return;

        const fetchPosts = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
                const data: Post[] = await response.json();
                // Mock adding image URLs
                const postsWithImages = data.map(post => ({
                    ...post,
                    imageUrl: `https://picsum.photos/200/300?random=${post.id}`
                }));
                setPosts(postsWithImages);
            } catch (error) {
                console.error('Failed to fetch posts', error);
            }
        };

        fetchPosts();
    }, [userId]);

    return posts;
};

export default useUserPosts;
