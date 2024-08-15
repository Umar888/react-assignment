import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {Spin, Row, Col, Button, Tabs, Modal, notification} from 'antd';
import { FilterOutlined, HomeOutlined, CalendarOutlined, FileTextOutlined, InfoCircleOutlined } from '@ant-design/icons';
import useUserData from './../hooks/useUserData';
import useUserPosts from './../hooks/useUserPosts';
import { Pagination } from "antd";
import EditPostForm from "./EditPostForm";
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
        border-bottom: 1px  #ABB2B4;
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

const PostList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const PostItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 8px;
    background: #FFF;
`;

const PostImage = styled.img`
    width: 150px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
`;

const PostContent = styled.div`
    flex: 1;
    margin-left: 15px;
`;

const PostTitle = styled.h3`
    margin: 0;
    font-size: 18px;
    color: #333;
`;

const PostDescription = styled.p`
    margin: 0;
    font-size: 12px;
    color: #ABB2B4;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    padding-top: 66.66%;
    overflow: hidden;
    border-radius: 12px;
    margin-bottom: 20px;
`;

const ModalImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
`;
const PostDate = styled.div`
    font-size: 12px;
    color: #888;
`;

const ReadMoreButton = styled(Button)`
    margin-top: 10px;
    padding: 0;
    background: transparent;
    color: #87BBF2;
    border: none;
    font-size: 12px;
    font-weight: bold;
    text-align: left;

    &:hover {
        color: #0056b3;
        text-decoration: underline;
    }
`;

const Blogs: React.FC = () => {
    const location = useLocation();
    const user = useUserData();

    const { posts: userPosts, deletePost, updateUserPost } = useUserPosts(user?.id || null);
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [heading, setHeading] = useState<string>('Blogs');
    const [icon, setIcon] = useState<React.ReactNode>(<HomeOutlined />);
    const [activeTab, setActiveTab] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState<number>(4);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setEditIsModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);


    useEffect(() => {
        if (userPosts) {
            setPosts(userPosts);
            setLoading(false);
        }
    }, [userPosts]);

    useEffect(() => {
        const path = location.pathname.split('/').pop();
        setActiveTab(path || 'all');

        switch (path) {
            case 'all':
                setHeading('All Blog Posts');
                setIcon(<FileTextOutlined />);
                break;
            case 'latest':
                setHeading('Latest Blogs');
                setIcon(<InfoCircleOutlined />);
                break;
            case 'archives':
                setHeading('Archived Blogs');
                setIcon(<CalendarOutlined />);
                break;
            default:
                setHeading('Blogs');
                setIcon(<FileTextOutlined />);
                break;
        }
    }, [location.pathname]);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(date);
    };

    const handleTabChange = (key: string) => {
        setActiveTab(key);
        switch (key) {
            case 'all':
                setHeading('All Blog Posts');
                setIcon(<FileTextOutlined />);
                break;
            case 'latest':
                setHeading('Latest Blogs');
                setIcon(<InfoCircleOutlined />);
                break;
            case 'archives':
                setHeading('Archived Blogs');
                setIcon(<CalendarOutlined />);
                break;
            default:
                setHeading('Blogs');
                setIcon(<FileTextOutlined />);
                break;
        }
    };

    const getLatestPosts = () => posts.slice(0, 4);
    const getArchivedPosts = () => posts.length > 4 ? posts.slice(-4) : posts;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePostClick = (post: any) => {
        setSelectedPost(post);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setEditIsModalVisible(false);
        setIsModalVisible(false);
        setSelectedPost(null);
    };

    const handleEdit = () => {
        setIsModalVisible(false);
        setEditIsModalVisible(true);
    };

    const handleDelete = () => {
        setIsModalVisible(false);
        setShowConfirmDialog(true);
    };

    const handleCancelDelete = () => {
        setShowConfirmDialog(false);
    };
    const handleUpdatePost = async (updatedPost: { title: string; body: string }) => {

        if (selectedPost) {
            await updateUserPost(selectedPost.id,updatedPost);
            setEditIsModalVisible(false);
            setSelectedPost(null);
            notification.success({
                message: 'Success',
                description: 'Post updated successfully',
            });
            const updatedPosts = posts.filter(post => post.id !== selectedPost.id);
            setPosts(updatedPosts);
        }
    };
    const handleConfirmDelete = async () => {
        if (selectedPost) {
            await deletePost(selectedPost.id);
            setShowConfirmDialog(false);
            setSelectedPost(null);
            notification.success({
                message: 'Success',
                description: 'Post deleted successfully',
            });
            const updatedPosts = posts.filter(post => post.id !== selectedPost.id);
            setPosts(updatedPosts);
        }
    };

    const paginatedPosts = posts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <>
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
                        <TabPane tab="ALL POSTS" key="all">
                            {loading ? (
                                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                                    <Spin size="large" />
                                </Col>
                            ) : (
                                <Col>
                                    <PostList>
                                        {paginatedPosts.map(post => (
                                            <PostItem key={post.id} onClick={() => handlePostClick(post)}>
                                                {post.imageUrl && <PostImage src={post.imageUrl} alt={post.title} />}
                                                <PostContent>
                                                    <Row align="middle" justify="space-between">
                                                        <PostTitle>{post.title}</PostTitle>
                                                        <PostDate>{formatDate(new Date())}</PostDate>
                                                    </Row>
                                                    <PostDescription>{post.body}</PostDescription>
                                                    <ReadMoreButton>Read More</ReadMoreButton>
                                                </PostContent>
                                            </PostItem>
                                        ))}
                                    </PostList>
                                    <Row justify="center" align="bottom">
                                        <Pagination
                                            current={currentPage}
                                            pageSize={pageSize}
                                            total={posts.length}
                                            onChange={handlePageChange}
                                            style={{ textAlign: 'center', marginTop: '20px', marginBottom: '10px' }}
                                        />
                                    </Row>
                                </Col>
                            )}
                        </TabPane>
                        <TabPane tab="LATEST POSTS" key="latest">
                            {loading ? (
                                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                                    <Spin size="large" />
                                </Col>
                            ) : (
                                <PostList>
                                    {getLatestPosts().map(post => (
                                        <PostItem key={post.id} onClick={() => handlePostClick(post)}>
                                            {post.imageUrl && <PostImage src={post.imageUrl} alt={post.title} />}
                                            <PostContent>
                                                <PostTitle>{post.title}</PostTitle>
                                                <PostDescription>{post.body}</PostDescription>
                                                <ReadMoreButton>Read More</ReadMoreButton>
                                            </PostContent>
                                            <PostDate>{formatDate(new Date())}</PostDate>
                                        </PostItem>
                                    ))}
                                </PostList>
                            )}
                        </TabPane>
                        <TabPane tab="ARCHIVE POSTS" key="archives">
                            {loading ? (
                                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                                    <Spin size="large" />
                                </Col>
                            ) : (
                                <PostList>
                                    {getArchivedPosts().map(post => (
                                        <PostItem key={post.id} onClick={() => handlePostClick(post)}>
                                            {post.imageUrl && <PostImage src={post.imageUrl} alt={post.title} />}
                                            <PostContent>
                                                <PostTitle>{post.title}</PostTitle>
                                                <PostDescription>{post.body}</PostDescription>
                                                <ReadMoreButton>Read More</ReadMoreButton>
                                            </PostContent>
                                            <PostDate>{formatDate(new Date())}</PostDate>
                                        </PostItem>
                                    ))}
                                </PostList>
                            )}
                        </TabPane>
                    </StyledTabs>
                </BlogContent>
                {selectedPost && (
                    <Modal
                        title={selectedPost.title}
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="edit" type="primary" onClick={handleEdit}>
                                Edit
                            </Button>,
                            <Button key="delete" type="primary" onClick={handleDelete} danger>
                                Delete
                            </Button>,
                            <Button key="back" onClick={handleCancel}>
                                Close
                            </Button>
                        ]}
                    >
                        {selectedPost.imageUrl && (
                            <ImageContainer>
                                <ModalImage
                                    src={selectedPost.imageUrl}
                                    alt={selectedPost.title}
                                />
                            </ImageContainer>
                        )}
                        <p><strong>Date:</strong> {formatDate(new Date())}</p>
                        <p><strong>Description:</strong> {selectedPost.body}</p>
                    </Modal>
                )}
                <Modal
                    title="Confirm Deletion"
                    visible={showConfirmDialog}
                    onOk={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <p>Are you sure you want to delete this post?</p>
                </Modal>

                <EditPostForm
                    post={selectedPost}
                    visible={isEditModalVisible}
                    onCancel={handleCancel}
                    onUpdate={handleUpdatePost}
                />
            </Container>
        </>
    );
};

export default Blogs;
