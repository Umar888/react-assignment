import React, { useState, useEffect } from 'react';
import {CalendarOutlined, FileTextOutlined, InfoCircleOutlined} from "@ant-design/icons";

interface User {
    id: number;
    name: string;
    email: string;
}

const useUserData = (): User | null => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = Math.floor(Math.random() * 10) + 1;
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            const data: User = await response.json();
            setUser(data);
        };

        fetchUser().then();
    }, []);

    return user;
};

export default useUserData;

