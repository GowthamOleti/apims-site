import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfilePicture = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #333333;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

const ProfileEmail = styled.span`
  font-size: 12px;
  color: #888888;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #888888;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #ffffff;
    background-color: #1a1a1a;
  }
`;

const UserStats = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #888888;
`;

function UserProfile({ user, onLogout, stats }) {
  return (
    <ProfileWrapper>
      <ProfilePicture 
        src={user.picture} 
        alt={user.name}
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=333333&color=ffffff`;
        }}
      />
      <ProfileInfo>
        <ProfileName>{user.name}</ProfileName>
        <ProfileEmail>{user.email}</ProfileEmail>
        {stats && (
          <UserStats>
            <StatItem>
              <StatNumber>{stats.resourcesAdded}</StatNumber>
              <StatLabel>Resources</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{stats.totalViews}</StatNumber>
              <StatLabel>Views</StatLabel>
            </StatItem>
          </UserStats>
        )}
        <LogoutButton onClick={onLogout}>
          Sign out
        </LogoutButton>
      </ProfileInfo>
    </ProfileWrapper>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
  stats: PropTypes.shape({
    resourcesAdded: PropTypes.number,
    totalViews: PropTypes.number,
  }),
};

export default UserProfile;
