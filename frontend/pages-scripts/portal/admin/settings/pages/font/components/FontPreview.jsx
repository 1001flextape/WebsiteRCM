import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const FontPreview = ({ fontFamily = 'Garamond' }) => {
  const previewText = "The quick brown fox jumps over the lazy dog.";

  const styles = {
    previewItem: {
      margin: '0.5rem 0',
      fontFamily: fontFamily,
    },
  };

  return (
    <>
      <Typography variant="h1" style={styles.previewItem}>
        {previewText}
      </Typography>
      <Typography variant="h2" style={styles.previewItem}>
        {previewText}
      </Typography>
      <Typography variant="h3" style={styles.previewItem}>
        {previewText}
      </Typography>
      <Typography variant="h4" style={styles.previewItem}>
        {previewText}
      </Typography>
      <Typography variant="h5" style={styles.previewItem}>
        {previewText}
      </Typography>
      <Typography variant="h6" style={styles.previewItem}>
        {previewText}
      </Typography>
      <Typography variant="body1" style={styles.previewItem}>
        {previewText}
      </Typography>
      <Typography variant="body1" style={{ ...styles.previewItem, fontWeight: 'bold' }}>
        {previewText}
      </Typography>
      <Typography variant="body1" style={{ ...styles.previewItem, fontStyle: 'italic' }}>
        {previewText}
      </Typography>
    </>
  );
};

export default FontPreview;
