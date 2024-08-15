import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const LayoutContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const Layout: React.FC = () => {
    return (
        <LayoutContainer>
            <Sidebar />
            <ContentContainer>
                <Outlet />
            </ContentContainer>
        </LayoutContainer>
    );
};

export default Layout;
