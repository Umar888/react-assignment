import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';
import useUserData from '../hooks/useUserData';

jest.mock('../hooks/useUserData');

describe('Sidebar', () => {
    const mockedUser = {
        id: 1,
        name: 'John Doe',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useUserData as jest.Mock).mockReturnValue(mockedUser);
    });

    it('fetches and displays user details', async () => {
        render(<Sidebar />);

        expect(screen.getByText(/Hello/i)).toBeInTheDocument();
        expect(screen.getByText(mockedUser.name)).toBeInTheDocument();

        expect(screen.getByAltText('User Image')).toHaveAttribute('src', `https://robohash.org/${mockedUser.id}`);
    });
});
