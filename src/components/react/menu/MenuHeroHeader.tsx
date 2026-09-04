import React from 'react';
import type { Business } from '@/lib/types';
import { MapPin, Phone } from 'lucide-react';

interface MenuHeroHeaderProps {
  business: Business;
  themeColor: string;
}

export default function MenuHeroHeader({ business, themeColor }: MenuHeroHeaderProps) {
  return (
    <div className="relative">
      {/* Cover Banner */}
      <div className="h-44 md:h-60 w-full bg-zinc-900 overflow-hidden relative">
        {business.bannerUrl && (
          <img
            src={business.bannerUrl}
            alt={business.name}
            className="w-full h-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/50 to-transparent"></div>
      </div>

      {/* Info Card */}
      <div className="max-w-3xl mx-auto px-4 -mt-16 relative z-10">
        <div className="flex items-end gap-4">
          <div className="w-24 h-24 rounded-3xl bg-zinc-900 border-4 border-[#09090B] shadow-2xl overflow-hidden shrink-0">
            {business.logoUrl ? (
              <img
                src={business.logoUrl}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">☕</div>
            )}
          </div>

          <div className="pb-1 min-w-0 flex-1">
            <h1 className="text-xl md:text-2xl font-black text-white truncate tracking-tight">
              {business.name}
            </h1>
            <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Servicio activo • Pedidos directos
            </p>
          </div>
        </div>

        <p className="text-xs text-zinc-300 mt-3 line-clamp-2 leading-relaxed">{business.description}</p>

        <div className="flex items-center gap-4 text-[11px] text-zinc-400 mt-2.5 flex-wrap">
          {business.address && (
            <span className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              {business.address}
            </span>
          )}
          {business.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              {business.phone}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
