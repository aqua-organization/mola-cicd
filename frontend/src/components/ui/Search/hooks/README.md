# useSearch Hook

A comprehensive React hook for search functionality with debouncing, history, loading states, and error handling.

## Features

- 🔍 **Debounced Search**: Automatic debouncing to prevent excessive API calls
- 📚 **Search History**: Automatic search history management
- ⏳ **Loading States**: Built-in loading state management
- ❌ **Error Handling**: Comprehensive error handling with abort controller
- 🎯 **Flexible**: Highly configurable with sensible defaults
- 🚀 **Performance**: Optimized with useCallback and proper cleanup

## Basic Usage

```jsx
import useSearch from "./hooks/useSearch";

function MyComponent() {
  const { query, results, isLoading, error, setQuery, handleSubmit, reset } =
    useSearch({
      debounceMs: 300,
      onSearch: (query, results) => {
        console.log("Search performed:", query, results);
      },
      fetchResults: async (searchQuery) => {
        const response = await fetch(`/api/search?q=${searchQuery}`);
        return response.json();
      },
    });

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      <ul>
        {results.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Advanced Usage with History

```jsx
import useSearch from "./hooks/useSearch";

function AdvancedSearch() {
  const {
    query,
    results,
    history,
    isLoading,
    error,
    setQuery,
    selectFromHistory,
    clearHistory,
    hasResults,
    isEmpty,
  } = useSearch({
    debounceMs: 500,
    enableHistory: true,
    maxHistoryItems: 5,
    minSearchLength: 2,
    fetchResults: async (searchQuery, { signal }) => {
      const response = await fetch(`/api/search?q=${searchQuery}`, {
        signal, // Support for abort controller
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      return response.json();
    },
    onSearch: (query, results) => {
      // Analytics or other side effects
      gtag("event", "search", {
        search_term: query,
        results_count: results.length,
      });
    },
  });

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search (min 2 characters)..."
      />

      {/* Search History */}
      {history.length > 0 && (
        <div>
          <h4>Recent Searches</h4>
          {history.map((item, index) => (
            <button key={index} onClick={() => selectFromHistory(item)}>
              {item}
            </button>
          ))}
          <button onClick={clearHistory}>Clear History</button>
        </div>
      )}

      {/* Results */}
      {isLoading && <div>Searching...</div>}
      {error && <div>Error: {error}</div>}
      {isEmpty && <div>No results found</div>}

      {hasResults && (
        <ul>
          {results.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Using with the Search Component

```jsx
import Search from "../components/ui/Search";

function App() {
  const handleSearch = async (query) => {
    const response = await fetch(`/api/search?q=${query}`);
    return response.json();
  };

  return (
    <Search
      onChange={(value) => console.log("Input changed:", value)}
      onSearch={(query, results) =>
        console.log("Search completed:", query, results)
      }
      fetchResults={handleSearch}
      showHistory={true}
      debounceMs={300}
      placeholder="Search users, emails, phones..."
    />
  );
}
```

## Configuration Options

| Option            | Type     | Default | Description                             |
| ----------------- | -------- | ------- | --------------------------------------- |
| `debounceMs`      | number   | 300     | Debounce delay in milliseconds          |
| `minSearchLength` | number   | 1       | Minimum search length to trigger search |
| `enableHistory`   | boolean  | true    | Enable search history                   |
| `maxHistoryItems` | number   | 10      | Maximum history items to store          |
| `onSearch`        | function | -       | Callback when search is triggered       |
| `fetchResults`    | function | -       | Function to fetch search results        |

## Return Values

### State

- `query`: Current search query
- `results`: Search results array
- `isLoading`: Loading state
- `error`: Error message (if any)
- `history`: Array of search history items
- `isOpen`: Dropdown/results visibility state

### Actions

- `setQuery(value)`: Update search query with debouncing
- `handleSubmit(query?)`: Perform immediate search
- `reset()`: Reset all search state
- `clearSearch()`: Clear results and error

### History Actions

- `clearHistory()`: Clear search history
- `removeFromHistory(item)`: Remove specific item from history
- `selectFromHistory(item)`: Select and search from history

### Dropdown Actions

- `open()`: Open results dropdown
- `close()`: Close results dropdown
- `toggleOpen()`: Toggle dropdown visibility

### Utility

- `hasResults`: Boolean indicating if there are results
- `hasQuery`: Boolean indicating if query meets minimum length
- `isEmpty`: Boolean indicating empty results state

## Best Practices

1. **Always provide fetchResults**: The hook is most useful when connected to an API
2. **Handle errors gracefully**: Always check for error state in your UI
3. **Use abort controller**: The hook automatically handles request cancellation
4. **Debounce appropriately**: Adjust debounceMs based on your API performance
5. **Limit history**: Set maxHistoryItems to prevent memory issues
6. **Cleanup**: The hook automatically cleans up on unmount

## Performance Tips

- The hook uses `useCallback` extensively to prevent unnecessary re-renders
- Search requests are automatically aborted when new searches are made
- History is managed efficiently with deduplication
- All timeouts and controllers are properly cleaned up
