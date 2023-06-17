import React from 'react';
import { Grid, CircularProgress } from '@mui/material';

/**
 * Loading indicator component.
 */
const LoadingIndicator: React.FC = () => {
    return (
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
            <CircularProgress />
        </Grid>
    );
};




export default LoadingIndicator