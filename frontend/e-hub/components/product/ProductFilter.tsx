'use client';

interface Category {
  _id: string;
  name: string;
}

interface ProductFilterProps {
  categories: Category[];
  selectedCategory: string;
  sortBy: string;
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (categoryId: string) => void;
  onSortChange: (sortBy: string) => void;
  onPriceChange: (minPrice: string, maxPrice: string) => void;
  onClear: () => void;
}

export default function ProductFilter({
  categories,
  selectedCategory,
  sortBy,
  minPrice,
  maxPrice,
  onCategoryChange,
  onSortChange,
  onPriceChange,
  onClear
}: ProductFilterProps) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Filters</h3>

      <div style={styles.filterGroup}>
        <label style={styles.label}>Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={styles.select}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.label}>Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          style={styles.select}
        >
          <option value="-createdAt">Newest First</option>
          <option value="createdAt">Oldest First</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="-rating">Highest Rated</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.label}>Price Range</label>
        <div style={styles.priceInputs}>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onPriceChange(e.target.value, maxPrice)}
            style={styles.priceInput}
          />
          <span style={styles.priceSeparator}>-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onPriceChange(minPrice, e.target.value)}
            style={styles.priceInput}
          />
        </div>
      </div>

      <button onClick={onClear} style={styles.clearButton}>
        Clear Filters
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '8px'
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: '20px'
  },
  filterGroup: {
    marginBottom: '20px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333333',
    marginBottom: '8px',
    display: 'block'
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    outline: 'none',
    cursor: 'pointer'
  },
  priceInputs: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  priceInput: {
    flex: 1,
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #F5F5F5',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    color: '#333333',
    outline: 'none'
  },
  priceSeparator: {
    fontSize: '14px',
    color: '#9E9E9E'
  },
  clearButton: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    color: '#333333',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '8px'
  }
};
