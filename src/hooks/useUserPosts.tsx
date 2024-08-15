import { useState, useEffect } from 'react';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    imageUrl?: string;
}

const useUserPosts = (userId: number | null) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (userId === null) return;

        const fetchPosts = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
                const data: Post[] = await response.json();
                // Mock adding image URLs
                const postsWithImages = data.map(post => ({
                    ...post,
                    imageUrl: `https://picsum.photos/300/200?random=${post.id}`
                }));
                setPosts(postsWithImages);
            } catch (error) {
                console.error('Failed to fetch posts', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [userId]);

    const deletePost = async (postId: number) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'DELETE'
            });
            // Update state to remove the deleted post
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Failed to delete post', error);
        }
    };

    const updateUserPost = async (postId: number, updatedPost: { title: string; body: string }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...updatedPost,
                    userId: posts.find(post => post.id === postId)?.userId
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });

            const updatedPostData: Post = await response.json();
            // Update state with the new post data
            setPosts(posts.map(post =>
                post.id === postId ? { ...post, ...updatedPostData } : post
            ));
        } catch (error) {
            console.error('Failed to update post', error);
        }
    };

    return { posts, loading, deletePost, updateUserPost };
};

export default useUserPosts;
