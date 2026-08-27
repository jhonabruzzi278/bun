import React from 'react';
import { TrendingUp, Lightbulb, Users, Clock, ArrowUpRight, Sparkles } from 'lucide-react';

export type ImpactLevel = 'ALTO' | 'MEDIO' | 'BAJO' | 'Alto impacto' | 'Impacto medio' | 'Bajo impacto';

export interface AiInsight {
  id: string;
  iconType: 'trending' | 'lightbulb' | 'efficiency' | 'traffic';
  title: string;
  impact: ImpactLevel;
  metricBadge?: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
}

interface AiInsightCardProps {
  insight: AiInsight;
}

export const AiInsightCard: React.FC<AiInsightCardProps> = ({ insight }) => {
  const getIcon = () => {
    switch (insight.iconType) {
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-[#2E7D32] dark:text-[#4ADE80]" />;
      case 'lightbulb':
        return <Lightbulb className="w-4 h-4 text-[#1A62C6] dark:text-[#60A5FA]" />;
      case 'efficiency':
        return <Users className="w-4 h-4 text-[#D97706] dark:text-[#FBBF24]" />;
      case 'traffic':
        return <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#34D399]" />;
      default:
        return <Sparkles className="w-4 h-4 text-color3 dark:text-color2" />;
    }
  };

  const getImpactBadge = () => {
    const imp = insight.impact.toUpperCase();
    if (imp.includes('ALTO')) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EAF5EC] dark:bg-[#1A3320] text-[#2E7D32] dark:text-[#4ADE80] border border-[#D5EBD8] dark:border-[#2C5935]">
          Alto impacto
        </span>
      );
    }
    if (imp.includes('MEDIO')) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FEF8E8] dark:bg-[#33220E] text-[#B45309] dark:text-[#FBBF24] border border-[#FDECB8] dark:border-[#593E1A]">
          Impacto medio
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EFF6FF] dark:bg-[#1A2640] text-[#2563EB] dark:text-[#60A5FA] border border-[#DBEAFE] dark:border-[#2A4373]">
        Bajo impacto
      </span>
    );
  };

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-[#241512] border border-[#EDE5DB] dark:border-[#3D2420] shadow-coffee-sm hover:shadow-coffee-md transition-all space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#FAF6F0] dark:bg-[#2F1B17] flex items-center justify-center border border-[#ECE3D7] dark:border-[#4D2D26] shrink-0">
            {getIcon()}
          </div>
          <h4 className="text-xs font-bold text-coffee-950 dark:text-white leading-tight">
            {insight.title}
          </h4>
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {getImpactBadge()}
        {insight.metricBadge && (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F4EFEA] dark:bg-[#2F1B17] text-coffee-800 dark:text-[#E8DFD8] border border-[#E5DDD4] dark:border-[#4D2D26]">
            {insight.metricBadge}
          </span>
        )}
      </div>

      <p className="text-[11px] text-[#70645A] dark:text-[#A8988B] leading-relaxed">
        {insight.description}
      </p>

      <button
        type="button"
        onClick={insight.onAction}
        className="w-full py-2 px-3 rounded-lg bg-[#FAF7F2] dark:bg-[#2C1814] hover:bg-[#F3EDE3] dark:hover:bg-[#38201C] text-coffee-800 dark:text-[#E8DFD8] hover:text-color4 dark:hover:text-color2 text-[11px] font-semibold border border-[#E5DDD4] dark:border-[#422621] transition flex items-center justify-center gap-1.5"
      >
        <span>{insight.actionLabel}</span>
      </button>
    </div>
  );
};

export default AiInsightCard;
