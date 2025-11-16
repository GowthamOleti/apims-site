import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ResourceCard from 'components/ResourceCard';
import AddResourceModal from 'components/AddResourceModal';

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
  letter-spacing: -1px;
`;

const PageDescription = styled.p`
  font-size: 16px;
  color: #888888;
  margin: 0;
  line-height: 1.5;
`;

const SearchResults = styled.div`
  font-size: 14px;
  color: #888888;
  margin-bottom: 16px;
  padding: 8px 0;
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

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
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

const AddButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 16px;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-1px);
  }
`;

function DesignToolPage({ resources, onAddResource, user }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: 'All Resources' },
    { id: 'ui-findings', label: 'UI Findings' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'books', label: 'Books' },
    { id: 'articles', label: 'Articles' },
    { id: 'videos', label: 'Videos' },
    { id: 'tools', label: 'Tools' }
  ];

  // Filter resources based on active filter and search query
  const filteredResources = resources.filter(resource => {
    const matchesFilter = activeFilter === 'all' || resource.type === activeFilter;
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  // Listen for search events from Header component
  useEffect(() => {
    const handleSearch = (event) => {
      setSearchQuery(event.detail.query);
    };

    window.addEventListener('search', handleSearch);
    return () => window.removeEventListener('search', handleSearch);
  }, []);

  const handleAddResource = (newResource) => {
    onAddResource(newResource);
    setShowAddModal(false);
  };

  return (
    <PageWrapper>
      <PageHeader>
        <PageTitle>Design Resources</PageTitle>
        <PageDescription>
          Curated collection of design resources, findings, and inspiration for our team.
        </PageDescription>
        {searchQuery && (
          <SearchResults>
            Found {filteredResources.length} result{filteredResources.length !== 1 ? 's' : ''} for "{searchQuery}"
          </SearchResults>
        )}
      </PageHeader>

      <FilterTabs>
        {filters.map(filter => (
          <FilterTab
            key={filter.id}
            active={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </FilterTab>
        ))}
      </FilterTabs>

      {filteredResources.length > 0 ? (
        <ResourcesGrid>
          {filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </ResourcesGrid>
      ) : (
        <EmptyState>
          <EmptyIcon>📚</EmptyIcon>
          <EmptyTitle>No resources found</EmptyTitle>
          <EmptyDescription>
            {activeFilter === 'all' 
              ? 'Start by adding your first design resource.'
              : `No ${activeFilter} found. Try a different filter or add a new resource.`
            }
          </EmptyDescription>
          <AddButton onClick={() => setShowAddModal(true)}>
            Add Resource
          </AddButton>
        </EmptyState>
      )}

      {showAddModal && (
        <AddResourceModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddResource}
        />
      )}
    </PageWrapper>
  );
}

DesignToolPage.propTypes = {
  resources: PropTypes.array.isRequired,
  onAddResource: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
};

export default DesignToolPage;
