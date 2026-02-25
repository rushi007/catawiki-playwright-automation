interface SearchStrategy {
  searchForKeyword(keyword: string): Promise<void>;
}

export default SearchStrategy;