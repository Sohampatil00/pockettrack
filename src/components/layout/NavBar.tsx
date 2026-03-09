import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Wallet, LayoutDashboard, ListOrdered, BarChart3, PieChart, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ListOrdered },
  { path: '/reports', label: 'Reports', icon: BarChart3 },
  { path: '/budget', label: 'Budget', icon: PieChart },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useApp();

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white shadow-sm">
                <Wallet className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">
                PocketTrack
              </span>
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link flex items-center gap-2 ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={() => signOut()}
              className="nav-link flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors ml-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-brand-500"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 animate-slide-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-xl text-base font-medium ${
                    isActive
                      ? 'bg-brand-50 text-brand-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
              </NavLink>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="w-full text-left block px-3 py-2.5 rounded-xl text-base font-medium text-red-500 hover:bg-red-50"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                Sign Out
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
