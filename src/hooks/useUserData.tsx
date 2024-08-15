import { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

const useUserData = (): User | null => {
    const [user, setUser] = useState<User | null>(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        const fetchUser = async () => {
            const userId = Math.floor(Math.random() * 10) + 1;
            const response = await fetch(`${apiUrl}/users/${userId}`);
            const data: User = await response.json();
            setUser(data);
        };

        fetchUser().then();
    }, []);

    return user;
};

export default useUserData;

