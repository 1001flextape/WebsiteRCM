import React from 'react';
import { useRouter } from 'next/router';

const UnderConstructionScene = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/auth/signin');
  };

  const gradientStyle = {
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)', // Darker gradient colors
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
  };

  const bannerStyle = {
    backgroundColor: '#ffcc00',
    color: '#000',
    padding: '10px 20px',
    border: '2px solid #000',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '24px',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#1f4068',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={gradientStyle}>
      <div style={bannerStyle}>Website Under Construction</div>
      <button style={buttonStyle} onClick={handleLoginClick}>
        Admin Login
      </button>
      <p style={{ marginTop: '20px' }}>Powered by WebsiteRCM</p>
    </div>
  );
};

export default UnderConstructionScene;
