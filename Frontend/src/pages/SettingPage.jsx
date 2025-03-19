import React from 'react';
import { THEMES } from '../constants';
import { useThemeStore } from '../store/useThemeStore';

function SettingPage() {
  const { theme, setTheme } = useThemeStore();

  return (
  <div className='h-max bg-accent bg-gray-900/90'> 
    <div className="h-max pt-20  bg-gray-900/90 container mx-auto px-4 max-w-5xl">
      <div className="space-y-10">
        {/* Theme Selection Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-100 drop-shadow-lg">
            🎨 Customize Your Theme
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose a theme to personalize your chat experience.
          </p>
        </div>

        {/* Theme Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                ${
                  theme === t
                    ? 'border-2 border-blue-500 shadow-lg bg-blue-100 dark:bg-blue-900'
                    : 'border border-gray-400 dark:border-gray-600'
                }`}
              onClick={() => setTheme(t)}
            >
              {/* Theme Preview Box */}
              <div
                className="relative h-12 w-full rounded-md overflow-hidden shadow-md"
                data-theme={t}
                style={{
                  background: theme === t ? '#007bff' : '#2d3748',
                  boxShadow: theme === t ? '0 0 10px rgba(59,130,246,0.6)' : 'none',
                }}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-blue-500"></div>
                  <div className="rounded bg-gray-600"></div>
                  <div className="rounded bg-indigo-500"></div>
                  <div className="rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>

              {/* Theme Name */}
              <span
                className={`text-sm font-medium transition-all ${
                  theme === t ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-300'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>  
  );
}

export default SettingPage;
