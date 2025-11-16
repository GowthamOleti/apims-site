// API service for connecting to the backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Authentication methods
  async loginWithGoogle() {
    window.location.href = `${this.baseURL}/auth/google`;
  }

  async getCurrentUser() {
    try {
      const response = await fetch(`${this.baseURL}/auth/me`, {
        headers: this.getAuthHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }

  async logout() {
    try {
      await fetch(`${this.baseURL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Resource methods
  async getResources(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${this.baseURL}/resources?${queryString}`, {
        headers: this.getAuthHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to fetch resources');
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw error;
    }
  }

  async getResource(id) {
    try {
      const response = await fetch(`${this.baseURL}/resources/${id}`, {
        headers: this.getAuthHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to fetch resource');
    } catch (error) {
      console.error('Error fetching resource:', error);
      throw error;
    }
  }

  async createResource(resourceData) {
    try {
      const response = await fetch(`${this.baseURL}/resources`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(resourceData)
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to create resource');
    } catch (error) {
      console.error('Error creating resource:', error);
      throw error;
    }
  }

  async updateResource(id, resourceData) {
    try {
      const response = await fetch(`${this.baseURL}/resources/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(resourceData)
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to update resource');
    } catch (error) {
      console.error('Error updating resource:', error);
      throw error;
    }
  }

  async deleteResource(id) {
    try {
      const response = await fetch(`${this.baseURL}/resources/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to delete resource');
    } catch (error) {
      console.error('Error deleting resource:', error);
      throw error;
    }
  }

  async likeResource(id) {
    try {
      const response = await fetch(`${this.baseURL}/resources/${id}/like`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to like resource');
    } catch (error) {
      console.error('Error liking resource:', error);
      throw error;
    }
  }

  // Admin methods
  async getAdminStats() {
    try {
      const response = await fetch(`${this.baseURL}/admin/stats`, {
        headers: this.getAuthHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to fetch admin stats');
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      throw error;
    }
  }

  async getContributors() {
    try {
      const response = await fetch(`${this.baseURL}/admin/contributors`, {
        headers: this.getAuthHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to fetch contributors');
    } catch (error) {
      console.error('Error fetching contributors:', error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const response = await fetch(`${this.baseURL}/admin/users`, {
        headers: this.getAuthHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to fetch users');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async updateUserAdminStatus(userId, isAdmin) {
    try {
      const response = await fetch(`${this.baseURL}/admin/users/${userId}/admin`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ isAdmin })
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to update user admin status');
    } catch (error) {
      console.error('Error updating user admin status:', error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const response = await fetch(`${this.baseURL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to delete user');
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

export default new ApiService();
