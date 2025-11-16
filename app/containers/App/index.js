/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import DesignToolPage from 'containers/DesignToolPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import LoginPage from 'components/LoginPage';
import AdminDashboard from 'components/AdminDashboard';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #000000;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 24px 32px;
  background-color: #000000;
`;

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [resources, setResources] = useState([
    {
      id: 1,
      type: 'ui-finding',
      title: 'Micro-interactions in Mobile Apps',
      description: 'A comprehensive study of micro-interactions that enhance user experience in mobile applications.',
      tags: ['mobile', 'ux', 'interactions'],
      author: 'Sarah Chen',
      authorId: 'user1',
      date: '2024-01-15',
      url: '#',
      views: 45
    },
    {
      id: 2,
      type: 'podcast',
      title: 'Design Matters with Debbie Millman',
      description: 'Weekly conversations with designers, artists, and creative professionals.',
      tags: ['design', 'creativity', 'interviews'],
      author: 'Debbie Millman',
      authorId: 'user2',
      date: '2024-01-12',
      url: '#',
      views: 32
    },
    {
      id: 3,
      type: 'book',
      title: 'Atomic Design by Brad Frost',
      description: 'A methodology for creating design systems that are both beautiful and functional.',
      tags: ['design-systems', 'methodology', 'frontend'],
      author: 'Brad Frost',
      authorId: 'user3',
      date: '2024-01-10',
      url: '#',
      views: 67
    },
    {
      id: 4,
      type: 'article',
      title: 'The Future of Design Tools',
      description: 'Exploring how AI and machine learning are reshaping the design industry.',
      tags: ['ai', 'future', 'tools'],
      author: 'Alex Johnson',
      authorId: 'user4',
      date: '2024-01-08',
      url: '#',
      views: 23
    }
  ]);

  // Check for existing user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    // Store user data in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setShowAdmin(false);
    localStorage.removeItem('user');
  };

  const handleAddResource = (newResource) => {
    const resourceWithUser = {
      ...newResource,
      id: Date.now(),
      authorId: user.id,
      author: user.name,
      date: new Date().toISOString().split('T')[0],
      views: 0
    };
    setResources([...resources, resourceWithUser]);
  };

  // Calculate user stats
  const getUserStats = () => {
    if (!user) return null;
    
    const userResources = resources.filter(r => r.authorId === user.id);
    const totalViews = userResources.reduce((sum, r) => sum + (r.views || 0), 0);
    
    return {
      resourcesAdded: userResources.length,
      totalViews: totalViews
    };
  };

  // Calculate contributors data for admin dashboard
  const getContributors = () => {
    const contributorsMap = new Map();
    
    resources.forEach(resource => {
      if (!contributorsMap.has(resource.authorId)) {
        contributorsMap.set(resource.authorId, {
          id: resource.authorId,
          name: resource.author,
          email: `${resource.author.toLowerCase().replace(' ', '.')}@company.com`,
          picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(resource.author)}&background=333333&color=ffffff`,
          resourcesAdded: 0,
          totalViews: 0,
          lastActive: 0
        });
      }
      
      const contributor = contributorsMap.get(resource.authorId);
      contributor.resourcesAdded += 1;
      contributor.totalViews += resource.views || 0;
      
      const daysSince = Math.floor((new Date() - new Date(resource.date)) / (1000 * 60 * 60 * 24));
      contributor.lastActive = Math.min(contributor.lastActive, daysSince);
    });
    
    return Array.from(contributorsMap.values());
  };

  // If no user is logged in, show login page
  if (!user) {
    return (
      <>
        <Helmet
          titleTemplate="%s - Design Team Hub"
          defaultTitle="Design Team Hub"
        >
          <meta name="description" content="Internal design resource management tool" />
        </Helmet>
        <LoginPage onLogin={handleLogin} />
        <GlobalStyle />
      </>
    );
  }

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Design Team Hub"
        defaultTitle="Design Team Hub"
      >
        <meta name="description" content="Internal design resource management tool" />
      </Helmet>
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <MainContent>
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          user={user}
          onLogout={handleLogout}
          onAdminClick={() => setShowAdmin(!showAdmin)}
          userStats={getUserStats()}
        />
        <ContentArea>
          {showAdmin ? (
            <AdminDashboard 
              contributors={getContributors()} 
              resources={resources}
            />
          ) : (
            <DesignToolPage 
              resources={resources}
              onAddResource={handleAddResource}
              user={user}
            />
          )}
        </ContentArea>
      </MainContent>
      <GlobalStyle />
    </AppWrapper>
  );
}