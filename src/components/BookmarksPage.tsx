import React from 'react';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppContext, Repository } from '../context/AppContext';

const BookmarksPage: React.FC = () => {
    // Access bookmarks and removeBookmark function from the AppContext
    const { bookmarks, removeBookmark } = useAppContext();
    
    // Initialize the navigate function from react-router-dom to handle navigation
    const navigate = useNavigate();

    // Function to handle removing a bookmarked repository
    const handleRemoveBookmark = (repository: Repository) => {
        removeBookmark(repository);
    };

    // Function to handle going back to the previous page
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: 2 }}>
            {/* Button to go back to the search page */}
            <Button startIcon={<ArrowBackIcon />} onClick={handleGoBack} sx={{ marginBottom: 2 }}>
                Go Back To Search
            </Button>
            
            {/* Heading for the bookmarked repositories */}
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Bookmarked Repositories
            </Typography>
            
            {/* Message displayed when there are no bookmarks */}
            {bookmarks?.length === 0 && (
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                    You haven't bookmarked any repositories yet. Please go back to add bookmarks.
                </Typography>
            )}
            
            {/* Display each bookmarked repository */}
            {bookmarks.map((repository) => (
                <Card key={repository.id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        {/* Repository name */}
                        <Typography variant="h6">{repository.name}</Typography>
                        
                        {/* Repository owner */}
                        <Typography variant="subtitle1">Owner: {repository.owner}</Typography>
                        
                        {/* Repository description */}
                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                            {repository.description}
                        </Typography>
                        
                        {/* Number of stars */}
                        <Typography variant="body2" color="text.secondary">
                            Stars: {repository.stars}
                        </Typography>
                        
                        {/* Button to remove the bookmark */}
                        <Button
                            variant="contained"
                            onClick={() => handleRemoveBookmark(repository)}
                            sx={{ marginTop: 1 }}
                        >
                            Remove Bookmark
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};

export default BookmarksPage;
