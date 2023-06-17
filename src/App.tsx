// Import necessary dependencies from libraries
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Import custom components
import SearchPage from './components/SearchPage';
import BookmarksPage from './components/BookmarksPage';

// Import and use the AppContextProvider
import AppContextProvider from './context/AppContext';

// Create a MUI theme
const theme = createTheme();

// Define the main App component
const App: React.FC = () => {
  return (
    // Wrap the app with the MUI theme provider
    <ThemeProvider theme={theme}>
      {/* Wrap the app with the AppContextProvider to provide application-wide context */}
      <AppContextProvider>
        {/* Set up routing with React Router */}
        <Router>
          <Routes>
            {/* Define the route for the SearchPage component */}
            <Route path="/" element={<SearchPage />} />

            {/* Define the route for the BookmarksPage component */}
            <Route path="/bookmarks" element={<BookmarksPage />} />
          </Routes>
        </Router>
      </AppContextProvider>
    </ThemeProvider>
  );
};

// Export the App component as the default export
export default App;
