import { useState } from 'react';
import { ChevronUp, ChevronDown, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { ordersTableData } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export function OrdersTable() {
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const { theme } = useApp();

  const rowsPerPage = 10;
  const bg = theme === 'dark' ? '#141414' : '#FFFFFF';
  const border = theme === 'dark' ? '#1F1F1F' : '#E4E2DF';
  const headerBg = theme === 'dark' ? '#111111' : '#F0EFED';
  const textPrimary = theme === 'dark' ? '#F2F2F2' : '#0A0A0A';
  const textMuted = theme === 'dark' ? '#555555' : '#888888';
  const hoverBg = theme === 'dark' ? '#1A1A1A' : '#F8F7F5';

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = [...ordersTableData].sort((a, b) => {
    if (!sortKey) return 0;
    const av = (a as any)[sortKey];
    const bv = (b as any)[sortKey];
    if (typeof av === 'number') return sortDir === 'asc' ? av - bv : bv - av;
    return sortDir === 'asc'
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av));
  });

  const pageData = sorted.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const totalPages = Math.ceil(sorted.length / rowsPerPage);

  const columns = [
    { key: 'orderId', label: 'ORDER ID' },
    { key: 'storeId', label: 'STORE ID' },
    { key: 'zone', label: 'ZONE' },
    { key: 'orderTime', label: 'ORDER TIME' },
    { key: 'deliveryTime', label: 'DELIVERY TIME' },
    { key: 'duration', label: 'DURATION' },
    { key: 'stockoutFlag', label: 'STOCKOUT' },
    { key: 'status', label: 'STATUS' },
  ];

  const statusConfig = {
    ON_TIME: { color: '#22C55E', Icon: CheckCircle, label: 'ON TIME' },
    DELAYED: { color: '#F59E0B', Icon: Clock, label: 'DELAYED' },
    SLA_BREACH: { color: '#FF4F00', Icon: AlertCircle, label: 'SLA BREACH' },
  };

  return (
    <div style={{ background: bg, border: `1px solid ${border}` }}>
      {/* Header */}
      <div style={{
        padding: '14px 20px',
        borderBottom: `1px solid ${border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: 'Inter Tight, sans-serif',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: textPrimary,
          textTransform: 'uppercase',
        }}>
          ORDER ACTIVITY LOG
        </span>
        <span style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 10,
          color: textMuted,
        }}>
          {ordersTableData.length} RECORDS
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: headerBg }}>
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    padding: '9px 16px',
                    textAlign: 'left',
                    borderBottom: `1px solid ${border}`,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      color: sortKey === col.key ? '#FF4F00' : textMuted,
                    }}>
                      {col.label}
                    </span>
                    {sortKey === col.key && (
                      sortDir === 'asc'
                        ? <ChevronUp size={10} style={{ color: '#FF4F00' }} />
                        : <ChevronDown size={10} style={{ color: '#FF4F00' }} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => {
              const sc = statusConfig[row.status as keyof typeof statusConfig];
              return (
                <tr
                  key={row.orderId}
                  style={{
                    borderBottom: `1px solid ${border}`,
                    transition: 'background 0.08s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '9px 16px' }}>
                    <span style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 11,
                      color: '#FF4F00',
                      fontWeight: 700,
                    }}>
                      {row.orderId}
                    </span>
                  </td>
                  <td style={{ padding: '9px 16px' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: textPrimary }}>
                      {row.storeId}
                    </span>
                  </td>
                  <td style={{ padding: '9px 16px' }}>
                    <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 11, color: textMuted }}>
                      {row.zone}
                    </span>
                  </td>
                  <td style={{ padding: '9px 16px' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: textPrimary }}>
                      {row.orderTime}
                    </span>
                  </td>
                  <td style={{ padding: '9px 16px' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: textPrimary }}>
                      {row.deliveryTime}
                    </span>
                  </td>
                  <td style={{ padding: '9px 16px' }}>
                    <span style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 11,
                      color: row.duration > 10 ? '#FF4F00' : textPrimary,
                      fontWeight: row.duration > 10 ? 700 : 400,
                    }}>
                      {row.duration}m
                    </span>
                  </td>
                  <td style={{ padding: '9px 16px' }}>
                    {row.stockoutFlag ? (
                      <span style={{
                        background: '#FF4F0020', color: '#FF4F00', border: '1px solid #FF4F0050',
                        padding: '2px 6px',
                        fontFamily: 'Space Mono, monospace',
                        fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
                      }}>
                        YES
                      </span>
                    ) : (
                      <span style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: 9, color: textMuted,
                      }}>
                        —
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '9px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <sc.Icon size={10} style={{ color: sc.color }} />
                      <span style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: 9, fontWeight: 700,
                        color: sc.color, letterSpacing: '0.04em',
                      }}>
                        {sc.label}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{
        padding: '12px 20px',
        borderTop: `1px solid ${border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: textMuted }}>
          {page * rowsPerPage + 1}–{Math.min((page + 1) * rowsPerPage, sorted.length)} of {sorted.length}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            style={{
              background: 'transparent', border: `1px solid ${border}`,
              padding: '4px 10px', cursor: page === 0 ? 'not-allowed' : 'pointer',
              color: page === 0 ? textMuted : textPrimary,
              fontFamily: 'Space Mono, monospace', fontSize: 10,
              opacity: page === 0 ? 0.4 : 1,
            }}
          >
            PREV
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              style={{
                background: i === page ? '#FF4F00' : 'transparent',
                border: `1px solid ${i === page ? '#FF4F00' : border}`,
                padding: '4px 8px', cursor: 'pointer',
                color: i === page ? '#FFFFFF' : textMuted,
                fontFamily: 'Space Mono, monospace', fontSize: 10,
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page === totalPages - 1}
            style={{
              background: 'transparent', border: `1px solid ${border}`,
              padding: '4px 10px', cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
              color: page === totalPages - 1 ? textMuted : textPrimary,
              fontFamily: 'Space Mono, monospace', fontSize: 10,
              opacity: page === totalPages - 1 ? 0.4 : 1,
            }}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
