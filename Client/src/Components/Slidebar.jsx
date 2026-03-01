import React from "react";
import {
  Globe,
  Atom,
  Cpu,
  Trophy,
  Film,
  Briefcase,
  HeartPlus,
  TrendingUp,
} from "lucide-react";
import { NavLink } from "react-router";
import { Plus } from "lucide-react";

const navigationItems = [
  { name: "Trending", icon: TrendingUp, endPoint: "/home/general" },
  { name: "World", icon: Globe, endPoint: "/home/world" },
  { name: "Technology", icon: Cpu, endPoint: "/home/technology" },
  { name: "Sports", icon: Trophy, endPoint: "/home/sports" },
  { name: "Entertainment", icon: Film, endPoint: "/home/entertainment" },
  { name: "Business", icon: Briefcase, endPoint: "/home/business" },
  { name: "Health", icon: HeartPlus, endPoint: "/home/health" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-50 min-h-screen border-r border-gray-200 sticky left-0">
      <nav className="p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.endPoint}
                  className={({ isActive }) =>
                    `flex w-full items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
