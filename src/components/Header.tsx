import React from 'react';
import { Layout, Input, Avatar, Button } from 'antd';
import { SearchOutlined, BellOutlined, MessageOutlined, AppstoreOutlined  } from '@ant-design/icons';
import styled from 'styled-components';
import useUserData from "../hooks/useUserData";

const { Header } = Layout;

const UserImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #DEE0E4;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        bottom: 4px;
        right: 4px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #4CAF50;
        border: 2px solid white;
    }
`;

const HeaderContainer = styled(Header)`
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    height: 64px; /* Increase the height of the header */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Optional shadow for better visibility */
`;

const SearchInput = styled(Input)`
    background-color: #F7FBFE;
    border-radius: 10px; /* Apply border-radius to the entire input */
    width: 300px; /* Adjust width as needed */

    .ant-input-prefix {
        color: #B4B9C5; /* Color of the search icon */
    }

    .ant-input {
        border: none; /* Remove border */
        border-radius: 10px; /* Ensure the input has the same border-radius */
    }

    .ant-input-search-button {
        display: none; /* Hide the search button */
    }

    .ant-input-group-addon {
        border-radius: 0 10px 10px 0; /* Apply border-radius to the right side */
    }
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px; /* Space between icons */
`;

const AddButton = styled(Button)`
    background: white;
    border: none;
    padding: 0;
    margin: 0;
    font-size: 13px;
    color: #000000;
    &:hover {
        background-color: #E3F7FD;
        color: #387CF6;
    }
`;

const Icon = styled.div`
    font-size: 18px;
    color: #ADB3B6;
    &:hover {
        color: #387CF6;
    }
`;

const AppHeader: React.FC = () => {
    const user = useUserData();

    return (
        <HeaderContainer>
            <SearchInput
                placeholder="Type here to search..."
                prefix={<SearchOutlined />}
            />
            <IconContainer>
                <AddButton>+Add</AddButton>
                <Icon>
                    <BellOutlined />
                </Icon>
                <Icon>
                    <MessageOutlined />
                </Icon>
                <Icon>
                    <AppstoreOutlined />
                </Icon>
                <UserImage src={`https://robohash.org/${user?.id}`} alt="User Image" />
            </IconContainer>
        </HeaderContainer>
    );
};

export default AppHeader;
