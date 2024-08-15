import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
    MenuOutlined,
    LineChartOutlined,
    HomeOutlined,
    CalendarOutlined,
    ScheduleOutlined,
    BellOutlined,
    FileTextOutlined,
    InfoCircleOutlined,
    FolderOpenOutlined,
    FileSearchOutlined,
    FileDoneOutlined,
    QuestionCircleOutlined,
    PhoneOutlined,
    MailOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

const { Sider } = Layout;
const { SubMenu } = Menu;

const LogoContainer = styled.div`
    background-color: #387BF6;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.img`
    height: 50px;
`;

const CustomSider = styled(Sider)`
    background: white;
    color: black;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    .ant-menu {
        background: white;
        color: black;
    }
`;

const UserProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    padding: 16px;
    position: relative;
`;

const UserImage = styled.img`
    width: 60px;
    height: 60px;
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

const GreetingText = styled.p`
    color: #D1D1D2;
    margin: 6px 0 0px 0;
    font-size: 14px;
`;

const UserName = styled.p`
    color: black;
    font-weight: bold;
    margin: 6px 0 0px 0;
    font-size: 16px;
`;

const SubMenuItem = styled(Menu.Item)`
    display: flex;
    align-items: center;
    margin: 0 !important;
    padding: 0 16px !important;
    font-size: 13px !important;
    color: #ADB3B6 !important;

    .anticon {
        margin-right: 8px;
        color: #ADB3B6 !important;
    }

    &:hover {
        color: #387CF6 !important;
        font-weight: bold;
        background-color: #E3F7FD !important;

        .anticon {
            color: #387CF6 !important;
        }
    }

    &.ant-menu-item-selected {
        background-color: #E3F7FD !important;
        font-weight: bold;
        color: #387CF6 !important;

        .anticon {
            color: #387CF6 !important;
        }
    }
`;

const MetricsButton = styled(Button)`
    background-color: #387BF6;
    border-color: #387BF6;
    color: white;
    margin: 8px 0 0px 0;
    width: calc(100% - 16px);
    display: flex;
    align-items: center;
    &:hover {
        background-color: #3062d9;
        border-color: #3062d9;
    }

    .anticon {
        color: white;
        margin-right: 8px;
    }
`;

const SectionHeading = styled.div`
    font-weight: bold;
    font-size: 13px;
    margin: 12px 16px;
    color: black; // Ensuring heading text color is consistent
`;

const CustomSubMenu = styled(SubMenu)`
    .ant-menu-submenu-title {
        font-weight: bold;
        margin: 0 0 !important;
        padding: 0 16px !important;
        font-size: 13px;
    }
`;

const Sidebar: React.FC = () => {
    const user = useUserData();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState<string>('/blogs/all');

    useEffect(() => {
        const path = location.pathname.split('/').slice(1).join('/');
        setSelectedKey(path);
    }, [location]);

    const handleSelect = ({ key }: { key: string }) => {
        setSelectedKey(key);
        navigate(`/${key}`);
    };

    return (
        <CustomSider width={250} style={{ background: "white" }}>
            <LogoContainer>
                <Logo src={logo} alt="Company Logo" />
                <MenuOutlined style={{ fontSize: '24px', color: 'white' }} />
            </LogoContainer>
            <UserProfileContainer>
                <UserImage src={`https://robohash.org/${user?.id}`} alt="User Image" />
                <GreetingText>Hello</GreetingText>
                <UserName>{user?.name || 'Loading...'}</UserName>
                <MetricsButton>
                    <LineChartOutlined />
                    Show Metrics
                </MetricsButton>
            </UserProfileContainer>
            <SectionHeading>Dashboard</SectionHeading>
            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[selectedKey]}
                onClick={handleSelect}
            >
                <SubMenuItem key="dashboard/overview">
                    <HomeOutlined />
                    Overview
                </SubMenuItem>
                <SubMenuItem key="dashboard/calendar">
                    <CalendarOutlined />
                    Calendar
                </SubMenuItem>
                <SubMenuItem key="dashboard/schedule-actions">
                    <ScheduleOutlined />
                    Schedule Actions
                </SubMenuItem>
                <SubMenuItem key="dashboard/live-alerts">
                    <BellOutlined />
                    Live Alerts
                </SubMenuItem>
            </Menu>
            <SectionHeading>Blogs</SectionHeading>
            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[selectedKey]}
                onClick={handleSelect}
            >
                <SubMenuItem key="blogs/all">
                    <FileTextOutlined />
                    All
                </SubMenuItem>
                <SubMenuItem key="blogs/latest">
                    <InfoCircleOutlined />
                    Latest
                </SubMenuItem>
                <SubMenuItem key="blogs/archives">
                    <CalendarOutlined />
                    Archives
                </SubMenuItem>
            </Menu>
            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[selectedKey]}
                onClick={handleSelect}
            >
                <CustomSubMenu key="documentation" title={<span>Documentation</span>}>
                    <SubMenuItem key="documentation-guides">
                        <FileSearchOutlined />
                        Guides
                    </SubMenuItem>
                    <SubMenuItem key="documentation-api">
                        <FileDoneOutlined />
                        API Reference
                    </SubMenuItem>
                    <SubMenuItem key="documentation-faq">
                        <QuestionCircleOutlined />
                        FAQ
                    </SubMenuItem>
                </CustomSubMenu>
                <Menu.Divider />
            </Menu>
            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[selectedKey]}
                onClick={handleSelect}
            >
                <CustomSubMenu key="reports" title={<span>Reports</span>}>
                    <SubMenuItem key="reports-sales">
                        <FileSearchOutlined />
                        Sales Report
                    </SubMenuItem>
                    <SubMenuItem key="reports-customers">
                        <FileDoneOutlined />
                        Customer Report
                    </SubMenuItem>
                    <SubMenuItem key="reports-inventory">
                        <FolderOpenOutlined />
                        Inventory Report
                    </SubMenuItem>
                </CustomSubMenu>
                <Menu.Divider />
            </Menu>
            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[selectedKey]}
                onClick={handleSelect}
            >
                <CustomSubMenu key="need-help" title={<span>Need Help?</span>}>
                    <SubMenuItem key="help-contact">
                        <PhoneOutlined />
                        Contact Support
                    </SubMenuItem>
                    <SubMenuItem key="help-email">
                        <MailOutlined />
                        Email Support
                    </SubMenuItem>
                    <SubMenuItem key="help-faq">
                        <QuestionCircleOutlined />
                        FAQs
                    </SubMenuItem>
                </CustomSubMenu>
            </Menu>
        </CustomSider>
    );
};

export default Sidebar;
