import React, { useState } from 'react';
import { Typography } from "@mui/material";

/**
 * Error message component.
 * 
 * @param {string} message - The error message to be displayed.
 */
const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
    return (
        <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
            {message}
        </Typography>
    );
};

export default ErrorMessage;
