import { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    size: '',
    minPrice: '',
    maxPrice: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  });

  useEffect(() => {
    fetchProducts();
  }, [filters, pagination.currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 12
      });

      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.size) params.append('size', filters.size);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

      const response = await api.get(`/products?${params}`);
      setProducts(response.data.products);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalProducts: response.data.totalProducts
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>All Products</h1>
          {!loading && products.length > 0 && (
            <div className="products-count">
              {pagination.totalProducts} {pagination.totalProducts === 1 ? 'product' : 'products'} found
            </div>
          )}
        </div>

        <div className="search-bar-container">
          <div className="search-bar">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search for products..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="search-input"
            />
            {filters.search && (
              <button
                className="clear-search"
                onClick={() => handleFilterChange('search', '')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <div className="products-layout">
          <aside className="filters-sidebar">
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </aside>

          <main className="products-content">
            {loading ? (
              <div className="spinner-container" style={{ minHeight: '400px' }}>
                <div className="spinner large"></div>
                <div className="spinner-text">Loading products...</div>
              </div>
            ) : products.length === 0 ? (
              <div className="no-products">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ marginBottom: '1rem', opacity: 0.5 }}>
                  <path d="M32 12C20.954 12 12 20.954 12 32C12 43.046 20.954 52 32 52C43.046 52 52 43.046 52 32C52 20.954 43.046 12 32 12ZM32 48C23.163 48 16 40.837 16 32C16 23.163 23.163 16 32 16C40.837 16 48 23.163 48 32C48 40.837 40.837 48 32 48Z" fill="currentColor"/>
                  <path d="M38 26L26 38M26 26L38 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <p>No products found</p>
                <p style={{ fontSize: '0.9rem', color: '#565959', marginTop: '0.5rem' }}>Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                <div className="products-grid">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {pagination.totalPages > 1 && (
                  <div className="pagination">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                    >
                      Previous
                    </button>
                    <span>
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;

