import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ placeholder = "Buscar productos..." }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // Limpiar input después de buscar
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-container">
      <div className="relative">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          aria-label="Buscar productos"
        />
        <button
          type="submit"
          className="search-button"
          aria-label="Realizar búsqueda"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <style jsx>{`
        .search-bar-container {
          display: flex;
          align-items: center;
        }

        .search-input {
          width: 250px;
          padding: var(--space-xs) var(--space-sm);
          padding-right: 40px;
          border: 2px solid var(--border-light);
          border-radius: var(--border-radius);
          font-size: 14px;
          color: var(--text-dark);
          background-color: var(--white);
          transition: all 0.3s ease;
          outline: none;
        }

        .search-input:hover {
          border-color: var(--primary-light);
        }

        .search-input:focus {
          border-color: var(--primary-medium);
          box-shadow: 0 0 0 1px var(--primary-light);
        }

        .search-input::placeholder {
          color: var(--text-light);
        }

        .search-button {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-light);
          cursor: pointer;
          padding: 4px 8px;
          transition: color 0.3s ease;
          outline: none;
        }

        .search-button:hover {
          color: var(--primary-medium);
        }

        .search-button:focus-visible {
          color: var(--primary-medium);
          border-radius: var(--border-radius);
          box-shadow: 0 0 0 2px var(--primary-light);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .search-input {
            width: 200px;
          }
        }
      `}</style>
    </form>
  );
}
