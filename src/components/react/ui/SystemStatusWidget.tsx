import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface SystemStatusWidgetProps {
  statusText?: string;
  subText?: string;
}

export const SystemStatusWidget: React.FC<SystemStatusWidgetProps> = ({
  statusText = 'Estado del sistema',
  subText = 'Todos los sistemas están operativos.',
}) => {
  return (
    <div className="p-3.5 mx-3 mb-4 rounded-xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm flex items-start gap-2.5 transition-colors">
      <div className="w-5 h-5 rounded-full bg-[#E7F3E8] dark:bg-[#1C3322] flex items-center justify-center shrink-0 mt-0.5 border border-[#D0EBD2] dark:border-[#2E5936]">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32] dark:text-[#4ADE80]" />
      </div>
      <div className="space-y-0.5">
        <h5 className="text-[11px] font-bold text-coffee-950 dark:text-white flex items-center gap-1.5">
          {statusText}
        </h5>
        <p className="text-[10px] text-[#70645A] dark:text-[#A8988B] leading-tight">
          {subText}
        </p>
      </div>
    </div>
  );
};

export default SystemStatusWidget;
