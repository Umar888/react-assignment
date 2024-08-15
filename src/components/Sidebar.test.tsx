import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';
import useUserData from '../hooks/useUserData';
import "./../matchMedia";

jest.mock('../hooks/useUserData');

const mockUsedNavigate = jest.fn();
const mockUsedLocation = {
    pathname: '/blogs/all' // Provide a default pathname
};

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
    useLocation: () => mockUsedLocation,
}));

describe('Sidebar', () => {

    const mockedUser = {
        id: 1,
        name: 'John Doe',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useUserData as jest.Mock).mockReturnValue(mockedUser);
    });

    it('fetches and displays user details', () => {
        render(<Sidebar />);

        expect(screen.getByText(/Hello/i)).toBeInTheDocument();
        expect(screen.getByText(mockedUser.name)).toBeInTheDocument();
        expect(screen.getByAltText('User Image')).toHaveAttribute('src', `https://robohash.org/${mockedUser.id}`);
    });
});
