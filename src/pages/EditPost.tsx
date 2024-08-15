import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    body: string;
}

const EditPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const data: Post = await response.json();
            setPost(data);
            setTitle(data.title);
            setBody(data.body);
        };

        fetchPost();
    }, [postId]);

    const handleSave = async () => {
        if (post) {
            const updatedPost = { ...post, title, body };
            await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPost),
            });
            navigate(`/posts/${post.id}`);
        }
    };

    return post ? (
        <div>
            <h1>Edit Post</h1>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Body:</label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} />
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default EditPost;
