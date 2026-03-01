import React from 'react';
import { Globe, BarChart3, Trophy, Film } from 'lucide-react';

const RightSidebar = () => {
  return (
    <aside className="w-80 p-6 space-y-6">
      {/* Tech Banner */}
      <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-6 text-white text-center">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-wider">NISM</h3>
          <h3 className="text-2xl font-bold tracking-wider">NOURL</h3>
          <p className="text-sm opacity-90 mt-4">TECHNOLOGY</p>
          <p className="text-xs opacity-75">Get Connected</p>
        </div>
      </div>

      {/* Climate Banner */}
      <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg p-6 text-white text-center relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="text-sm font-bold mb-2">CLIMATE CHANGE SUMMIT</h4>
          <p className="text-xs opacity-90 mb-4">Nations unite to tackle pollution for earth.</p>
        </div>
        <Globe className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-16 w-16 opacity-20" />
      </div>

      {/* Sports Banner */}
      <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg p-6 text-white text-center relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <Trophy className="h-8 w-8 mx-auto text-yellow-400" />
          <h4 className="text-sm font-bold">CHAMPIONSHIP</h4>
          <p className="text-xs opacity-90">Historic victory celebration</p>
        </div>
      </div>

      {/* Movie Posters Banner */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg p-6 text-white text-center">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-800 rounded aspect-[3/4] flex items-center justify-center">
              <Film className="h-6 w-6 opacity-50" />
            </div>
          ))}
        </div>
        <h4 className="text-sm font-bold">BOX OFFICE RECORDS</h4>
        <p className="text-xs opacity-90 mt-1">Opening weekend success</p>
      </div>

      {/* Economic Growth Banner */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg p-6 text-white text-center relative">
        <div className="relative z-10">
          <h4 className="text-sm font-bold mb-2">ECONOMIC GROWTH</h4>
          <p className="text-xs opacity-90 mb-4">Positive forecast ahead</p>
        </div>
        <BarChart3 className="absolute bottom-2 right-2 h-12 w-12 opacity-20" />
      </div>
    </aside>
  );
};

export default RightSidebar;