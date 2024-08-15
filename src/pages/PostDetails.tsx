import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    body: string;
}

const PostDetails: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const data: Post = await response.json();
            setPost(data);
        };

        fetchPost();
    }, [postId]);

    const handleDelete = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'DELETE',
        });
        navigate('/blogs');
    };

    return post ? (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <img src="/path-to-your-static-image.jpg" alt="Post" />
            <button onClick={() => navigate(`/posts/${post.id}/edit`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default PostDetails;
