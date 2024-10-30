import React from 'react';
import { MoonLoader } from 'react-spinners';

// Loader component to show a spinner when content is loading
const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <MoonLoader size={80} color="#0d6efd" />
    </div>
  );
};

// Inline styles for loader container
const styles = {
  loaderContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1000,
  },
};

export default Loader;
