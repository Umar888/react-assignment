import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FilterOutlined, HomeOutlined, CalendarOutlined, ScheduleOutlined, BellOutlined } from '@ant-design/icons';
import { Row, Col, Button, Tabs } from 'antd';

const { TabPane } = Tabs;

const Container = styled.div`
    background-color: #F1F3F9;
    min-height: calc(100vh - 64px);
    margin: 0;
    padding: 30px;
    overflow: hidden;
`;

const HeaderRow = styled(Row)`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Heading = styled.h2`
    margin: 0;
    font-size: 16px;
    color: #333;
`;

const SubHeading = styled.div`
    margin: 4px 0 0 0;
    font-size: 12px;
    color: #C7C7CA;
`;

const IconHeadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const IconContainer = styled.div`
    background-color: #387BF6;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    margin-right: 10px;

    .anticon {
        color: white;
        font-size: 28px;
    }
`;

const StyledTabs = styled(Tabs)`
    .ant-tabs-nav {
        margin-bottom: 30px;
        border-bottom: 1px #ABB2B4;
    }

    .ant-tabs-tab {
        font-size: 12px;
        color: #ABB2B4;
        margin-right: 12px;
        font-weight: 700;
    }

    .ant-tabs-tab-active {
        color: #000;
        font-weight: 700;
    }

    .ant-tabs-ink-bar {
        background-color: #387BF6;
    }
`;

const BlogContent = styled.div`
    background: white;
    padding: 10px 20px;
    border-radius: 8px;
    height: 100%;
    max-height: calc(100vh - 170px);
    min-height: calc(100vh - 200px);
    overflow-y: auto;
`;

const CenteredContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Dashboard: React.FC = () => {
    const location = useLocation();
    const [heading, setHeading] = useState<string>('Dashboard');
    const [icon, setIcon] = useState<React.ReactNode>(<HomeOutlined />);
    const [activeTab, setActiveTab] = useState<string>('overview');

    useEffect(() => {
        const path = location.pathname.split('/').pop();
        setActiveTab(path || 'overview');

        switch (path) {
            case 'overview':
                setHeading('Overview');
                setIcon(<HomeOutlined />);
                break;
            case 'calendar':
                setHeading('Calendar');
                setIcon(<CalendarOutlined />);
                break;
            case 'schedule-actions':
                setHeading('Schedule Actions');
                setIcon(<ScheduleOutlined />);
                break;
            default:
                setHeading('Live Alerts');
                setIcon(<BellOutlined />);
                break;
        }
    }, [location.pathname]);

    const handleTabChange = (key: string) => {
        setActiveTab(key);
        switch (key) {
            case 'overview':
                setHeading('Overview');
                setIcon(<HomeOutlined />);
                break;
            case 'calendar':
                setHeading('Calendar');
                setIcon(<CalendarOutlined />);
                break;
            case 'schedule-actions':
                setHeading('Schedule Actions');
                setIcon(<ScheduleOutlined />);
                break;
            default:
                setHeading('Live Alerts');
                setIcon(<BellOutlined />);
                break;
        }
    };

    return (
        <Container>
            <HeaderRow justify="space-between">
                <Row align="middle" style={{ flex: 1 }}>
                    <Col>
                        <IconContainer>{icon}</IconContainer>
                    </Col>
                    <Col>
                        <IconHeadingContainer>
                            <Heading>{heading}</Heading>
                            <SubHeading>{"Qatar Development Bank"}</SubHeading>
                        </IconHeadingContainer>
                    </Col>
                </Row>
                <Col>
                    <Button icon={<FilterOutlined />} style={{ fontWeight: 'bold' }}>Filter/Sort By</Button>
                </Col>
            </HeaderRow>
            <BlogContent>
                <StyledTabs activeKey={activeTab} onChange={handleTabChange}>
                    <TabPane tab="OVERVIEW" key="overview">
                        <CenteredContent>
                            <p style={{ color: 'black' }}>This is the overview page</p>
                        </CenteredContent>
                    </TabPane>
                    <TabPane tab="CALENDAR" key="calendar">
                        <CenteredContent>
                            <p style={{ color: 'black' }}>This is the calendar page</p>
                        </CenteredContent>
                    </TabPane>
                    <TabPane tab="SCHEDULE ACTIONS" key="schedule-actions">
                        <CenteredContent>
                            <p style={{ color: 'black' }}>This is the schedule actions page</p>
                        </CenteredContent>
                    </TabPane>
                    <TabPane tab="LIVE ALERTS" key="live-alerts">
                        <CenteredContent>
                            <p style={{ color: 'black' }}>This is the live alerts page</p>
                        </CenteredContent>
                    </TabPane>
                </StyledTabs>
            </BlogContent>
        </Container>
    );
};

export default Dashboard;
