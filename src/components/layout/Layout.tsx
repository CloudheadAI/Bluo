import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { Avatar } from '../common';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/messages', label: 'Messages', icon: '💬' },
    { to: '/notifications', label: 'Notifications', icon: '🔔', badge: unreadCount },
    { to: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <nav
        className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link to="/" className="text-xl font-bold text-blue-500 tracking-tight" aria-label="Bluo home">
          Bluo
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative p-2 rounded-lg text-lg transition-colors ${
                  location.pathname === link.to
                    ? 'bg-blue-50 text-blue-500'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
                aria-label={link.label}
                aria-current={location.pathname === link.to ? 'page' : undefined}
              >
                <span role="img" aria-hidden="true">
                  {link.icon}
                </span>
                {link.badge ? (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {link.badge}
                  </span>
                ) : null}
              </Link>
            ))}

            <div className="ml-2 flex items-center gap-2">
              <Link to="/profile" aria-label="Profile">
                <Avatar name={user?.displayName || 'User'} size="sm" />
              </Link>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-xl transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export function MobileNav() {
  const { isAuthenticated } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const links = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/messages', label: 'Messages', icon: '💬' },
    { to: '/create', label: 'Create', icon: '➕' },
    { to: '/notifications', label: 'Alerts', icon: '🔔', badge: unreadCount },
    { to: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-100 md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-14">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`relative flex flex-col items-center px-3 py-1 rounded-lg transition-colors ${
              location.pathname === link.to ? 'text-blue-500' : 'text-gray-400'
            }`}
            aria-label={link.label}
            aria-current={location.pathname === link.to ? 'page' : undefined}
          >
            <span className="text-lg" role="img" aria-hidden="true">
              {link.icon}
            </span>
            <span className="text-[10px] mt-0.5">{link.label}</span>
            {link.badge ? (
              <span className="absolute -top-0.5 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {link.badge}
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6 pb-20 md:pb-6 flex-1 w-full">{children}</main>
      <footer className="border-t border-gray-100 bg-white py-4 hidden md:block">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between text-xs text-gray-400">
          <span>&copy; {new Date().getFullYear()} Bluo</span>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
      <MobileNav />
    </div>
  );
}
