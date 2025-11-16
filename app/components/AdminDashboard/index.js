import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DashboardWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  margin-bottom: 32px;
`;

const DashboardTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
  letter-spacing: -1px;
`;

const DashboardDescription = styled.p`
  font-size: 16px;
  color: #888888;
  margin: 0;
  line-height: 1.5;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background-color: #111111;
  border: 1px solid #333333;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #888888;
  font-weight: 500;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.active ? '#ffffff' : '#1a1a1a'};
  color: ${props => props.active ? '#000000' : '#cccccc'};
  border: 1px solid #333333;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#ffffff' : '#333333'};
    color: ${props => props.active ? '#000000' : '#ffffff'};
  }
`;

const ContributorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const ContributorCard = styled.div`
  background-color: #111111;
  border: 1px solid #333333;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #555555;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

const ContributorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const ContributorAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #333333;
`;

const ContributorInfo = styled.div`
  flex: 1;
`;

const ContributorName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 4px 0;
`;

const ContributorEmail = styled.p`
  font-size: 14px;
  color: #888888;
  margin: 0;
`;

const ContributorStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
`;

const ContributorStat = styled.div`
  text-align: center;
`;

const ContributorStatNumber = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
`;

const ContributorStatLabel = styled.div`
  font-size: 12px;
  color: #888888;
`;

const RecentResources = styled.div`
  margin-top: 16px;
`;

const RecentResource = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #1a1a1a;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ResourceIcon = styled.span`
  font-size: 16px;
`;

const ResourceTitle = styled.span`
  font-size: 14px;
  color: #cccccc;
  flex: 1;
`;

const ResourceDate = styled.span`
  font-size: 12px;
  color: #888888;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 64px 32px;
  color: #888888;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #cccccc;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #888888;
  margin: 0;
`;

function AdminDashboard({ contributors, resources }) {
  const [activeFilter, setActiveFilter] = useState('all');

  // Calculate stats
  const totalContributors = contributors.length;
  const totalResources = resources.length;
  const totalViews = resources.reduce((sum, resource) => sum + (resource.views || 0), 0);
  const activeContributors = contributors.filter(c => c.resourcesAdded > 0).length;

  // Filter contributors
  const filteredContributors = activeFilter === 'all' 
    ? contributors 
    : contributors.filter(c => c.resourcesAdded > 0);

  const getTypeIcon = (type) => {
    const icons = {
      'ui-finding': '🎨',
      'podcast': '🎧',
      'book': '📚',
      'article': '📖',
      'video': '🎬',
      'tool': '⚡',
      'inspiration': '✨'
    };
    return icons[type] || '📄';
  };

  return (
    <DashboardWrapper>
      <DashboardHeader>
        <DashboardTitle>Team Contributions</DashboardTitle>
        <DashboardDescription>
          Overview of team member contributions and resource statistics.
        </DashboardDescription>
      </DashboardHeader>

      <StatsGrid>
        <StatCard>
          <StatNumber>{totalContributors}</StatNumber>
          <StatLabel>Total Contributors</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{activeContributors}</StatNumber>
          <StatLabel>Active Contributors</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{totalResources}</StatNumber>
          <StatLabel>Resources Added</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{totalViews}</StatNumber>
          <StatLabel>Total Views</StatLabel>
        </StatCard>
      </StatsGrid>

      <FilterTabs>
        <FilterTab 
          active={activeFilter === 'all'} 
          onClick={() => setActiveFilter('all')}
        >
          All Contributors
        </FilterTab>
        <FilterTab 
          active={activeFilter === 'active'} 
          onClick={() => setActiveFilter('active')}
        >
          Active Contributors
        </FilterTab>
      </FilterTabs>

      {filteredContributors.length > 0 ? (
        <ContributorsGrid>
          {filteredContributors.map(contributor => {
            const userResources = resources.filter(r => r.authorId === contributor.id);
            const recentResources = userResources
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 3);

            return (
              <ContributorCard key={contributor.id}>
                <ContributorHeader>
                  <ContributorAvatar 
                    src={contributor.picture} 
                    alt={contributor.name}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(contributor.name)}&background=333333&color=ffffff`;
                    }}
                  />
                  <ContributorInfo>
                    <ContributorName>{contributor.name}</ContributorName>
                    <ContributorEmail>{contributor.email}</ContributorEmail>
                  </ContributorInfo>
                </ContributorHeader>

                <ContributorStats>
                  <ContributorStat>
                    <ContributorStatNumber>{contributor.resourcesAdded}</ContributorStatNumber>
                    <ContributorStatLabel>Resources</ContributorStatLabel>
                  </ContributorStat>
                  <ContributorStat>
                    <ContributorStatNumber>{contributor.totalViews}</ContributorStatNumber>
                    <ContributorStatLabel>Views</ContributorStatLabel>
                  </ContributorStat>
                  <ContributorStat>
                    <ContributorStatNumber>{contributor.lastActive}</ContributorStatNumber>
                    <ContributorStatLabel>Days Ago</ContributorStatLabel>
                  </ContributorStat>
                </ContributorStats>

                {recentResources.length > 0 && (
                  <RecentResources>
                    <div style={{ fontSize: '12px', color: '#888888', marginBottom: '8px', fontWeight: '600' }}>
                      Recent Resources:
                    </div>
                    {recentResources.map(resource => (
                      <RecentResource key={resource.id}>
                        <ResourceIcon>{getTypeIcon(resource.type)}</ResourceIcon>
                        <ResourceTitle>{resource.title}</ResourceTitle>
                        <ResourceDate>{new Date(resource.date).toLocaleDateString()}</ResourceDate>
                      </RecentResource>
                    ))}
                  </RecentResources>
                )}
              </ContributorCard>
            );
          })}
        </ContributorsGrid>
      ) : (
        <EmptyState>
          <EmptyIcon>👥</EmptyIcon>
          <EmptyTitle>No contributors found</EmptyTitle>
          <EmptyDescription>
            {activeFilter === 'all' 
              ? 'No team members have signed in yet.'
              : 'No active contributors found.'
            }
          </EmptyDescription>
        </EmptyState>
      )}
    </DashboardWrapper>
  );
}

AdminDashboard.propTypes = {
  contributors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    resourcesAdded: PropTypes.number.isRequired,
    totalViews: PropTypes.number.isRequired,
    lastActive: PropTypes.number.isRequired,
  })).isRequired,
  resources: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    views: PropTypes.number,
  })).isRequired,
};

export default AdminDashboard;
