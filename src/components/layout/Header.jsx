import { useState } from 'react';
import { Navigation } from './Navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex justify-between items-center">
          {/* Logo/Title */}
          <h1 className="text-lg sm:text-2xl text-primary-500 font-bold">
            Daily Planner
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-secondary-600" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-secondary-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-secondary-100 mt-4">
            <Navigation mobile onNavClick={() => setIsMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
};