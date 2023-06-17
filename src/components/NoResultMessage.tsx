import React, { useState } from 'react';
import { Typography } from "@mui/material";

/**
 * No Result component.
 */
const NoResults: React.FC = () => {
    return (
        <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
            No results found.
        </Typography>
    );
};

export default NoResults