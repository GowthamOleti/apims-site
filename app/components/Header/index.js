import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserProfile from 'components/UserProfile';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background-color: #000000;
  border-bottom: 1px solid #333333;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #1a1a1a;
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.5px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SearchInput = styled.input`
  background-color: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 8px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 14px;
  width: 240px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #555555;
    background-color: #222222;
  }
  
  &::placeholder {
    color: #888888;
  }
  
  @media (max-width: 768px) {
    width: 160px;
  }
`;

const AdminButton = styled.button`
  background-color: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 8px;
  padding: 8px 16px;
  color: #cccccc;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #333333;
    color: #ffffff;
  }
`;

function Header({ onMenuClick, user, onLogout, onAdminClick, userStats }) {
  const handleSearchChange = (e) => {
    const query = e.target.value;
    // Emit custom event for search
    window.dispatchEvent(new CustomEvent('search', { detail: { query } }));
  };

  return (
    <HeaderWrapper>
      <LeftSection>
        <MenuButton onClick={onMenuClick}>
          ☰
        </MenuButton>
        <PageTitle>Design Resources</PageTitle>
      </LeftSection>
      
      <RightSection>
        <SearchInput 
          placeholder="Search resources..." 
          onChange={handleSearchChange}
        />
        {user && (
          <>
            <AdminButton onClick={onAdminClick}>
              Admin
            </AdminButton>
            <UserProfile 
              user={user} 
              onLogout={onLogout}
              stats={userStats}
            />
          </>
        )}
      </RightSection>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  onLogout: PropTypes.func,
  onAdminClick: PropTypes.func,
  userStats: PropTypes.shape({
    resourcesAdded: PropTypes.number,
    totalViews: PropTypes.number,
  }),
};

export default Header;