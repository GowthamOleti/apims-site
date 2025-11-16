import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SidebarWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background-color: #111111;
  border-right: 1px solid #333333;
  z-index: 1000;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  
  @media (max-width: 768px) {
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const SidebarHeader = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid #333333;
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.5px;
`;

const SidebarContent = styled.div`
  padding: 20px 0;
`;

const NavSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: #888888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 20px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  color: #cccccc;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    background-color: #1a1a1a;
    color: #ffffff;
  }
  
  &.active {
    background-color: #1a1a1a;
    color: #ffffff;
    border-right: 2px solid #ffffff;
  }
`;

const NavIcon = styled.span`
  margin-right: 12px;
  font-size: 16px;
`;

const AddButton = styled.button`
  width: calc(100% - 40px);
  margin: 0 20px;
  padding: 12px 16px;
  background-color: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #333333;
    border-color: #555555;
  }
`;

function Sidebar({ isOpen, onToggle }) {
  const navItems = [
    { icon: '📋', label: 'UI Findings', id: 'ui-findings' },
    { icon: '🎧', label: 'Podcasts', id: 'podcasts' },
    { icon: '📚', label: 'Books', id: 'books' },
    { icon: '🎨', label: 'Design Tools', id: 'design-tools' },
    { icon: '📖', label: 'Articles', id: 'articles' },
    { icon: '🎬', label: 'Videos', id: 'videos' },
    { icon: '🖼️', label: 'Inspiration', id: 'inspiration' },
    { icon: '⚡', label: 'Quick Tips', id: 'quick-tips' },
  ];

  return (
    <SidebarWrapper isOpen={isOpen}>
      <SidebarHeader>
        <Logo>Design Hub</Logo>
      </SidebarHeader>
      
      <SidebarContent>
        <NavSection>
          <SectionTitle>Resources</SectionTitle>
          {navItems.map(item => (
            <NavItem key={item.id}>
              <NavIcon>{item.icon}</NavIcon>
              {item.label}
            </NavItem>
          ))}
        </NavSection>
        
        <NavSection>
          <SectionTitle>Actions</SectionTitle>
          <AddButton>
            + Add New Resource
          </AddButton>
        </NavSection>
      </SidebarContent>
    </SidebarWrapper>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Sidebar;
