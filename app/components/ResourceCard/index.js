import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardWrapper = styled.div`
  background-color: #111111;
  border: 1px solid #333333;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #555555;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const TypeIcon = styled.div`
  font-size: 20px;
  margin-right: 12px;
`;

const TypeLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #888888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #cccccc;
  margin: 0 0 16px 0;
  line-height: 1.5;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
`;

const Tag = styled.span`
  background-color: #1a1a1a;
  color: #888888;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #888888;
`;

const Author = styled.span`
  font-weight: 500;
`;

const Date = styled.span``;

const ExternalLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    color: #cccccc;
  }
`;

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

const getTypeLabel = (type) => {
  const labels = {
    'ui-finding': 'UI Finding',
    'podcast': 'Podcast',
    'book': 'Book',
    'article': 'Article',
    'video': 'Video',
    'tool': 'Tool',
    'inspiration': 'Inspiration'
  };
  return labels[type] || 'Resource';
};

function ResourceCard({ resource }) {
  return (
    <CardWrapper>
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TypeIcon>{getTypeIcon(resource.type)}</TypeIcon>
          <TypeLabel>{getTypeLabel(resource.type)}</TypeLabel>
        </div>
      </CardHeader>
      
      <CardTitle>{resource.title}</CardTitle>
      <CardDescription>{resource.description}</CardDescription>
      
      <TagsContainer>
        {resource.tags.map(tag => (
          <Tag key={tag}>#{tag}</Tag>
        ))}
      </TagsContainer>
      
      <CardFooter>
        <div>
          <Author>by {resource.author}</Author>
          <span style={{ margin: '0 8px' }}>•</span>
          <Date>{new Date(resource.date).toLocaleDateString()}</Date>
        </div>
        <ExternalLink href={resource.url} target="_blank" rel="noopener noreferrer">
          View →
        </ExternalLink>
      </CardFooter>
    </CardWrapper>
  );
}

ResourceCard.propTypes = {
  resource: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResourceCard;
