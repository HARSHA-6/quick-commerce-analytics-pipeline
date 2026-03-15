import { useState } from 'react';
import { Search, Bell, Sun, Moon, ChevronDown, Circle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { notificationsData } from '../../data/mockData';

const stores = ['All Stores', 'South Mumbai', 'Bandra West', 'Andheri East', 'Powai', 'Thane', 'Navi Mumbai'];
const dateRanges = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Custom'];

export function TopNav() {
  const {
    sidebarCollapsed, theme, setTheme,
    setNotificationsPanelOpen, notificationsPanelOpen,
    selectedStore, setSelectedStore,
    dateRange, setDateRange,
  } = useApp();

  const [searchFocused, setSearchFocused] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const sidebarW = sidebarCollapsed ? 60 : 240;

  const bg = theme === 'dark' ? '#0F0F0F' : '#F5F4F2';
  const borderColor = theme === 'dark' ? '#1F1F1F' : '#DDDBD8';
  const textPrimary = theme === 'dark' ? '#F2F2F2' : '#0A0A0A';
  const textMuted = theme === 'dark' ? '#666666' : '#888888';
  const inputBg = theme === 'dark' ? '#171717' : '#ECEAE7';
  const dropdownBg = theme === 'dark' ? '#171717' : '#FFFFFF';
  const dropdownBorder = theme === 'dark' ? '#282828' : '#DDDBD8';

  const unreadCount = notificationsData.filter(n => !n.read).length;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: sidebarW,
        right: 0,
        height: 56,
        background: bg,
        borderBottom: `1px solid ${borderColor}`,
        zIndex: 99,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '0 24px',
        transition: 'left 0.22s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Search */}
      <div style={{ flex: 1, maxWidth: 320, position: 'relative' }}>
        <Search
          size={13}
          style={{
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
            color: textMuted, pointerEvents: 'none',
          }}
        />
        <input
          type="text"
          placeholder="Search orders, stores, zones..."
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            width: '100%',
            background: inputBg,
            border: `1px solid ${searchFocused ? '#FF4F00' : borderColor}`,
            color: textPrimary,
            padding: '6px 10px 6px 30px',
            fontFamily: 'Inter Tight, sans-serif',
            fontSize: 12,
            outline: 'none',
            transition: 'border-color 0.1s ease',
          }}
        />
      </div>

      <div style={{ flex: 1 }} />

      {/* Store Selector */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => { setStoreDropdownOpen(!storeDropdownOpen); setDateDropdownOpen(false); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: inputBg, border: `1px solid ${borderColor}`,
            padding: '5px 10px', cursor: 'pointer', color: textPrimary,
          }}
        >
          <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: 12, fontWeight: 500 }}>
            {selectedStore}
          </span>
          <ChevronDown size={11} style={{ color: textMuted }} />
        </button>
        {storeDropdownOpen && (
          <div
            style={{
              position: 'absolute', top: '100%', right: 0, marginTop: 4,
              background: dropdownBg, border: `1px solid ${dropdownBorder}`,
              minWidth: 160, zIndex: 200,
            }}
          >
            {stores.map(s => (
              <button
                key={s}
                onClick={() => { setSelectedStore(s); setStoreDropdownOpen(false); }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '8px 12px', background: s === selectedStore ? '#FF4F00' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  color: s === selectedStore ? '#FFFFFF' : textPrimary,
                  fontFamily: 'Inter Tight, sans-serif', fontSize: 12,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Date Range */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => { setDateDropdownOpen(!dateDropdownOpen); setStoreDropdownOpen(false); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: inputBg, border: `1px solid ${borderColor}`,
            padding: '5px 10px', cursor: 'pointer', color: textPrimary,
          }}
        >
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11 }}>
            {dateRange}
          </span>
          <ChevronDown size={11} style={{ color: textMuted }} />
        </button>
        {dateDropdownOpen && (
          <div
            style={{
              position: 'absolute', top: '100%', right: 0, marginTop: 4,
              background: dropdownBg, border: `1px solid ${dropdownBorder}`,
              minWidth: 140, zIndex: 200,
            }}
          >
            {dateRanges.map(d => (
              <button
                key={d}
                onClick={() => { setDateRange(d); setDateDropdownOpen(false); }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '8px 12px', background: d === dateRange ? '#FF4F00' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  color: d === dateRange ? '#FFFFFF' : textPrimary,
                  fontFamily: 'Space Mono, monospace', fontSize: 11,
                }}
              >
                {d}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* System Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '0 4px' }}>
        <Circle size={7} style={{ color: '#22C55E', fill: '#22C55E' }} />
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#22C55E', whiteSpace: 'nowrap' }}>
          OPERATIONAL
        </span>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        style={{
          background: 'transparent', border: `1px solid ${borderColor}`,
          padding: '6px', cursor: 'pointer', color: textMuted,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
      </button>

      {/* Notifications */}
      <button
        onClick={() => setNotificationsPanelOpen(!notificationsPanelOpen)}
        style={{
          background: notificationsPanelOpen ? '#FF4F00' : 'transparent',
          border: `1px solid ${notificationsPanelOpen ? '#FF4F00' : borderColor}`,
          padding: '6px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          color: notificationsPanelOpen ? '#FFFFFF' : textMuted,
        }}
      >
        <Bell size={13} />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute', top: -4, right: -4,
              background: '#FF4F00', color: '#FFFFFF',
              width: 14, height: 14, borderRadius: '50%',
              fontFamily: 'Space Mono, monospace', fontSize: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${bg}`,
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Avatar */}
      <div
        style={{
          width: 28, height: 28, background: '#FF4F00',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, cursor: 'pointer',
        }}
      >
        <span style={{
          fontFamily: 'Inter Tight, sans-serif', fontSize: 11,
          fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em',
        }}>
          AK
        </span>
      </div>
    </div>
  );
}
