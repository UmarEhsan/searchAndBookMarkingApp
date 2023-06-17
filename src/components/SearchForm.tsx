import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

/**
 * SearchForm component.
 * 
 * @param {function} onSearch - The function to handle search action.
 * @param {boolean} isDisabled - Indicates whether the search button is disabled.
 * @param {function} onChange - The function to handle input value change.
 * @param {string} value - The current value of the input field.
 */
const SearchForm: React.FC<{
    onSearch: () => void,
    isDisabled: boolean,
    onChange: (value: string) => void,
    value: string
}> = ({ onSearch, isDisabled, onChange, value }) => {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={24} sm={24}>
                <TextField
                    label="Search repositories"
                    fullWidth
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    InputProps={{
                        autoComplete: 'off'
                    }}
                />
            </Grid>
            <Grid item xs={24} sm={2}>
                <Button variant="contained" onClick={onSearch} fullWidth disabled={isDisabled}>
                    Search
                </Button>
            </Grid>
        </Grid>
    );
};

export default SearchForm;
