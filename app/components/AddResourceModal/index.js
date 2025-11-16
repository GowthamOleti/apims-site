import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: #111111;
  border: 1px solid #333333;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0 24px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #888888;
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #ffffff;
    background-color: #1a1a1a;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #cccccc;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  background-color: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 8px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #555555;
    background-color: #222222;
  }
  
  &::placeholder {
    color: #888888;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background-color: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 8px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #555555;
    background-color: #222222;
  }
  
  &::placeholder {
    color: #888888;
  }
`;

const Select = styled.select`
  width: 100%;
  background-color: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 8px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #555555;
    background-color: #222222;
  }
  
  option {
    background-color: #1a1a1a;
    color: #ffffff;
  }
`;

const TagsInput = styled.input`
  width: 100%;
  background-color: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 8px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #555555;
    background-color: #222222;
  }
  
  &::placeholder {
    color: #888888;
  }
`;

const TagsHelper = styled.p`
  font-size: 12px;
  color: #888888;
  margin: 4px 0 0 0;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 0 24px 24px 24px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
`;

const CancelButton = styled(Button)`
  background-color: #1a1a1a;
  color: #cccccc;
  border: 1px solid #333333;
  
  &:hover {
    background-color: #333333;
    color: #ffffff;
  }
`;

const SaveButton = styled(Button)`
  background-color: #ffffff;
  color: #000000;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-1px);
  }
  
  &:disabled {
    background-color: #333333;
    color: #888888;
    cursor: not-allowed;
    transform: none;
  }
`;

const resourceTypes = [
  { value: 'ui-finding', label: 'UI Finding' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'book', label: 'Book' },
  { value: 'article', label: 'Article' },
  { value: 'video', label: 'Video' },
  { value: 'tool', label: 'Tool' },
  { value: 'inspiration', label: 'Inspiration' }
];

function AddResourceModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    type: 'ui-finding',
    title: '',
    description: '',
    tags: '',
    author: '',
    url: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const resource = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      date: new Date().toISOString().split('T')[0]
    };
    
    onAdd(resource);
  };

  const isFormValid = formData.title && formData.description && formData.author;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Add New Resource</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Label>Resource Type</Label>
              <Select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
              >
                {resourceTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Title *</Label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter resource title"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Description *</Label>
              <TextArea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the resource..."
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Author *</Label>
              <Input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="Author name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>URL</Label>
              <Input
                type="url"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://example.com"
              />
            </FormGroup>

            <FormGroup>
              <Label>Tags</Label>
              <TagsInput
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="design, ux, mobile"
              />
              <TagsHelper>Separate tags with commas</TagsHelper>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SaveButton type="submit" disabled={!isFormValid}>
              Add Resource
            </SaveButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}

AddResourceModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddResourceModal;
