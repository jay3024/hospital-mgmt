
import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import HealthInput from './HealthInput';
import HealthButton from './HealthButton';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface HealthTableProps {
  columns: Column[];
  data: any[];
  searchable?: boolean;
  sortable?: boolean;
  paginated?: boolean;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  className?: string;
  onRowClick?: (row: any) => void;
  loading?: boolean;
}

const HealthTable: React.FC<HealthTableProps> = ({
  columns,
  data,
  searchable = true,
  sortable = true,
  paginated = true,
  rowsPerPageOptions = [5, 10, 25, 50],
  defaultRowsPerPage = 10,
  className = '',
  onRowClick,
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(row =>
      columns.some(column =>
        String(row[column.key] || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;
    
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage, paginated]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handleSort = (key: string) => {
    if (!sortable) return;
    
    setSortConfig(current => {
      if (current?.key === key) {
        return current.direction === 'asc' 
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) {
      return (
        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      );
    }
    
    return sortConfig.direction === 'asc' ? (
      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search */}
      {searchable && (
        <div className="flex items-center justify-between">
          <HealthInput
            placeholder="Search table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className="max-w-sm"
          />
          <div className="text-sm text-muted-foreground">
            Showing {paginatedData.length} of {sortedData.length} results
          </div>
        </div>
      )}

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-sm font-medium text-muted-foreground ${
                    sortable && column.sortable !== false ? 'cursor-pointer hover:text-foreground' : ''
                  }`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {sortable && column.sortable !== false && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className={`border-t border-border hover:bg-accent/50 transition-colors ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm text-foreground">
                    {column.render ? column.render(row[column.key], row) : String(row[column.key] || '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedData.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No data available
          </div>
        )}
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-1 border border-input rounded bg-background text-foreground"
            >
              {rowsPerPageOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <HealthButton
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              icon={<ChevronLeft className="w-4 h-4" />}
            >
              Previous
            </HealthButton>
            
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            
            <HealthButton
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Next
            </HealthButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthTable;
