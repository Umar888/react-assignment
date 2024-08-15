import React from 'react';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import Header from "./components/Header";

const { Content } = Layout;

const App: React.FC = () => {
    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Header />
                    <Content>
                        <Routes>
                            <Route path="/" element={<Navigate to="/blogs/all" replace />} />
                            <Route path="/dashboard/*" element={<Dashboard />} />
                            <Route path="/blogs/*" element={<Blogs />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};

export default App;
