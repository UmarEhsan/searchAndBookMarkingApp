import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Button, Grid } from '@mui/material';
import { NoResults, SearchResult, SearchForm, Pagination, LoadingIndicator, ErrorMessage } from '../components';
import { useAppContext } from '../context/AppContext';

/**
 * SearchPage component.
 */
const SearchPage: React.FC = () => {
    const navigate = useNavigate();
    const { searchResults, setSearchResults, bookmarks } = useAppContext();
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    /**
     * Maps the retrieved repository items to a simplified format.
     * 
     * @param {array} items - The array of repository items.
     * @returns {array} - The mapped repositories.
     */
    const mapRepositories = useCallback((items: any[]) => {
        return items.map((item: any) => ({
            id: item.id,
            name: item.name,
            owner: item.owner.login,
            description: item.description,
            stars: item.stargazers_count,
        }));
    }, []);

    /**
     * Gets the query parameters from the URL.
     * 
     * @returns {URLSearchParams} - The URLSearchParams object.
     */
    const getSearchParams = () => new URLSearchParams(window.location.search);

    /**
     * Handles the search action.
     */
    const handleSearch = useCallback(async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const query: any = searchText || queryParams.get('q');
        const { API_URL } = process.env

        try {
            setIsLoading(true);
            const response = await fetch(
                `${API_URL}?q=${encodeURIComponent(query)}`
            );
            const { items } = await response.json();
            const repositories = mapRepositories(items);
            setSearchResults(repositories);
            setTotalPages(Math.ceil(repositories.length / 10));
            setCurrentPage(1);

            // Set query parameters in the URL
            const queryParams = getSearchParams();
            queryParams.set('q', query);
            navigate(`?${queryParams.toString()}`);
        } catch (error) {
            console.log(error)
            setError('Error searching repositories. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [searchText, mapRepositories, setSearchResults]);

    /**
     * Handles the page change event.
     * 
     * @param {number} page - The new page number.
     */
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    /**
     * Handles the view bookmarks action.
     */
    const handleViewBookmarks = useCallback(() => {
        navigate('/bookmarks');
    }, [navigate]);

    useEffect(() => {
        const queryParams = getSearchParams();
        const query = queryParams.get('q');

        if (query) {
            setSearchText(query);
            handleSearch();
        }
    }, []);

    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const displayedResults = searchResults.slice(startIndex, endIndex);
    const isSearchDisabled = searchText === '';

    return (
        <Container maxWidth="md" sx={{ marginTop: 2 }}>

            <SearchForm
                onSearch={handleSearch}
                isDisabled={isSearchDisabled}
                onChange={setSearchText}
                value={searchText}
            />

            {isLoading ? (
                <LoadingIndicator />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : displayedResults.length > 0 ? (
                <Grid container spacing={2} sx={{ marginTop: 2 }} style={{ display: 'flex' }}>
                    {displayedResults.map((repository) => (
                        <Grid item key={repository.id} xs={12} sm={6} md={12} style={{ display: 'flex' }}>
                            <SearchResult repository={repository} />
                        </Grid>
                    ))}
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </Grid>
                </Grid>
            ) : (
                <NoResults />
            )}

            <Grid container justifyContent="flex-start" sx={{ marginTop: 2 }}>
                <Grid item>
                    <Button variant="contained" onClick={handleViewBookmarks}>
                        View Bookmarks
                    </Button>
                </Grid>


            </Grid>
        </Container>
    );
};

export default React.memo(SearchPage);
