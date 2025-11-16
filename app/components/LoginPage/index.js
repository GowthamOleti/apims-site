import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000000;
`;

const LoginCard = styled.div`
  background-color: #111111;
  border: 1px solid #333333;
  border-radius: 16px;
  padding: 48px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  margin: 20px;
`;

const Logo = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #888888;
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
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

const GoogleIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjAwMDIgNC4xNjY2N0MxMS44MzM1IDQuMTY2NjcgMTMuMzMzNSAyLjY2NjY3IDEzLjMzMzUgMC44MzMzMzNDMTMuMzMzNSAtMC45OTk5OTcgMTEuODMzNSAtMi41IDEwLjAwMDIgLTIuNUM4LjE2Njg0IC0yLjUgNi42NjY4NCAtMC45OTk5OTcgNi42NjY4NCAwLjgzMzMzM0M2LjY2Njg0IDIuNjY2NjcgOC4xNjY4NCA0LjE2NjY3IDEwLjAwMDIgNC4xNjY2N1oiIGZpbGw9IiM0Mjg1RjQiLz4KPHBhdGggZD0iTTEwLjAwMDIgMTcuNUMxMS44MzM1IDE3LjUgMTMuMzMzNSAxNiAxMy4zMzM1IDE0LjE2NjdDMTMuMzMzNSAxMi4zMzMzIDExLjgzMzUgMTAuODMzMyAxMC4wMDAyIDEwLjgzMzNDOC4xNjY4NCAxMC44MzMzIDYuNjY2ODQgMTIuMzMzMyA2LjY2Njg0IDE0LjE2NjdDNi42NjY4NCAxNiA4LjE2Njg0IDE3LjUgMTAuMDAwMiAxNy41WiIgZmlsbD0iIzM0QTg1MyIvPgo8cGF0aCBkPSJNMTcuNSAxMC4wMDAyQzE3LjUgMTQuMTQyMiAxNC4xNDIyIDE3LjUgMTAuMDAwMiAxNy41QzUuODU4MTcgMTcuNSAyLjUgMTQuMTQyMiAyLjUgMTAuMDAwMkMyLjUgNS44NTgxNyA1Ljg1ODE3IDIuNSAxMC4wMDAyIDIuNUMxNC4xNDIyIDIuNSAxNy41IDUuODU4MTcgMTcuNSAxMC4wMDAyWiIgZmlsbD0iI0ZCQkMwNSIvPgo8cGF0aCBkPSJNMTcuNSAxMC4wMDAyQzE3LjUgMTQuMTQyMiAxNC4xNDIyIDE3LjUgMTAuMDAwMiAxNy41QzUuODU4MTcgMTcuNSAyLjUgMTQuMTQyMiAyLjUgMTAuMDAwMkMyLjUgNS44NTgxNyA1Ljg1ODE3IDIuNSAxMC4wMDAyIDIuNUMxNC4xNDIyIDIuNSAxNy41IDUuODU4MTcgMTcuNSAxMC4wMDAyWiIgZmlsbD0iI0VBMzQ0MiIvPgo8L3N2Zz4K');
  background-size: contain;
  background-repeat: no-repeat;
`;

const ErrorMessage = styled.div`
  background-color: #2d1b1b;
  border: 1px solid #5c2626;
  border-radius: 8px;
  padding: 12px;
  margin-top: 16px;
  color: #ff6b6b;
  font-size: 14px;
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #333333;
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function LoginPage({ onLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize Google OAuth
  useEffect(() => {
    const initializeGoogleAuth = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id',
          callback: handleCredentialResponse,
          auto_select: false,
        });
      }
    };

    // Load Google OAuth script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleAuth;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = (response) => {
    setIsLoading(true);
    setError('');

    try {
      // Decode the JWT token (in a real app, you'd verify this on the server)
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      const userData = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        given_name: payload.given_name,
        family_name: payload.family_name,
      };

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Call the login callback
      onLogin(userData);
    } catch (err) {
      setError('Failed to sign in. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setError('');
    
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      setError('Google Sign-In is not available. Please refresh the page.');
      setIsLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <Logo>Design Hub</Logo>
        <Subtitle>
          Sign in to access design resources and contribute to the team knowledge base.
        </Subtitle>
        
        <GoogleButton onClick={handleGoogleSignIn} disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <GoogleIcon />
          )}
          {isLoading ? 'Signing in...' : 'Continue with Google'}
        </GoogleButton>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginCard>
    </LoginWrapper>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
