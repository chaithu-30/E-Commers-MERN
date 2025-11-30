import './Filters.css';

const Filters = ({ filters, onFilterChange }) => {
  const { search, category, size, minPrice, maxPrice } = filters;

  return (
    <div className="filters">
      <h3>Filters</h3>

      <div className="filter-group">
        <label>Category</label>
        <select
          value={category || ''}
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Size</label>
        <select
          value={size || ''}
          onChange={(e) => onFilterChange('size', e.target.value)}
        >
          <option value="">All Sizes</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Min Price</label>
        <input
          type="number"
          placeholder="0"
          value={minPrice || ''}
          onChange={(e) => onFilterChange('minPrice', e.target.value)}
          min="0"
        />
      </div>

      <div className="filter-group">
        <label>Max Price</label>
        <input
          type="number"
          placeholder="1000"
          value={maxPrice || ''}
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          min="0"
        />
      </div>

      <button
        className="clear-filters"
        onClick={() => {
          onFilterChange('search', '');
          onFilterChange('category', '');
          onFilterChange('size', '');
          onFilterChange('minPrice', '');
          onFilterChange('maxPrice', '');
        }}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;

