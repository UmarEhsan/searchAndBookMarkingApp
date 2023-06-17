import React, { createContext, useState, useContext, useEffect } from 'react';

export interface Repository {
  id: number;
  name: string;
  owner: string;
  description: string;
  stars: number;
}

// Define the shape of the AppContextProps
interface AppContextProps {
  searchResults: Repository[]; // Array to store search results
  setSearchResults: (results: Repository[]) => void; // Function to update search results
  bookmarks: Repository[]; // Array to store bookmarks
  addBookmark: (repository: Repository) => void; // Function to add a bookmark
  removeBookmark: (repository: Repository) => void; // Function to remove a bookmark
}

// Create the AppContext and set the initial value to undefined
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Custom hook to access the AppContext
export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }
  return context;
};

interface AppContextProviderProps {
  children: React.ReactNode; // Child components
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  // State variables for searchResults and bookmarks
  const [searchResults, setSearchResults] = useState<Repository[]>([]);
  const [bookmarks, setBookmarks] = useState<Repository[]>([]);

  // Load bookmarks from local storage on component mount
  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  // Save bookmarks to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Add a repository to bookmarks
  const addBookmark = (repository: Repository) => {
    // Check if the repository already exists in bookmarks
    const isDuplicate = bookmarks.some((bookmark) => bookmark.id === repository.id);
    if (!isDuplicate) {
      setBookmarks((prevBookmarks) => [...prevBookmarks, repository]);
    }
  };

  // Remove a repository from bookmarks
  const removeBookmark = (repository: Repository) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((bookmark) => bookmark.id !== repository.id)
    );
  };

  // Provide the context value to child components
  return (
    <AppContext.Provider
      value={{ searchResults, setSearchResults, bookmarks, addBookmark, removeBookmark }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
