import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Settings,
  Shield,
  School
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Tableau de bord' },
    { path: '/users', icon: Users, label: 'Utilisateurs' },
    { path: '/services', icon: Settings, label: 'Services' },
    { path: '/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/admins', icon: Shield, label: 'Administrateurs' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 px-3 py-4 flex flex-col">
      <div className="flex items-center gap-2 px-3 py-3 mb-8">
        <School className="h-8 w-8 text-indigo-600" />
        <span className="text-xl font-bold text-gray-800">SMS Scolaire</span>
      </div>
      
      <nav className="flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-200 pt-4 mt-6">
        <div className="px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-medium">A</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Admin</p>
              <p className="text-xs text-gray-500">admin@ecole.fr</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;