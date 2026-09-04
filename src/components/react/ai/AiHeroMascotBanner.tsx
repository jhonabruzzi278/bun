import React from 'react';
import { Sparkles, Zap, ArrowRight, Eye, Flame } from 'lucide-react';
import { Button, Badge, Card, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui';
import { toast } from 'sonner';

interface AiHeroMascotBannerProps {
  businessName: string;
}

export default function AiHeroMascotBanner({ businessName }: AiHeroMascotBannerProps) {
  const handleApplyTip = () => {
    toast.success('¡Estrategia de Brew copiada!', {
      description: 'Se configuró el combo nocturno de cerveza artesanal + smash en la carta.',
      className: 'dark:bg-zinc-900 dark:text-white dark:border-amber-500/30'
    });
  };

  return (
    <Card glass className="relative overflow-hidden p-6 md:p-8 rounded-[32px] border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
      {/* Decorative ambient Apple glow */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-amber-500/[0.07] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-orange-500/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {/* Mascot Avatar: Official Brew Owl */}
          <div className="relative shrink-0 group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border border-white/[0.15] shadow-2xl bg-black/40 relative">
              <img
                src="/images/brew-mascot.jpg"
                alt="Brew - Mascota Oficial de brew.cl"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black tracking-wider flex items-center gap-1.5 shadow-md border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              EN VIVO
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge variant="amber" dot>
                Brew la Lechuza • Copiloto IA
              </Badge>
              <Badge variant="secondary">
                Visión Nocturna 24/7
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
              ¡Hola, soy Brew! <span className="text-xl">🦉🍺</span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
              La lechuza cervecera y copiloto gastronómico para <strong className="text-amber-400 font-bold">{businessName}</strong> en <strong className="text-white">brew.cl</strong>. Visión aguda para maximizar tus márgenes, rotación de mesas y comandas.
            </p>
          </div>
        </div>

        {/* Action Pills & Interactive Quick Insight Dialog */}
        <div className="flex flex-wrap items-center gap-3 self-stretch lg:self-auto justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary" size="default" className="shadow-lg shadow-amber-500/20">
                <Zap className="w-4 h-4" />
                <span>Consejo de Brew</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 mb-2">
                  <img src="/images/brew-mascot.jpg" alt="Brew" className="w-full h-full object-cover" />
                </div>
                <DialogTitle>Análisis Táctico Nocturno</DialogTitle>
                <DialogDescription>
                  Brew la lechuza ha procesado las últimas 48 horas de comandas en {businessName}.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-2">
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      Hora Punta Detectada
                    </span>
                    <Badge variant="amber">Hoy 20:45 hrs</Badge>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Se prevé un 35% más de afluencia en mesas de terraza. Prepara 15 raciones de papas rústicas de mise en place.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      Oportunidad de Maridaje (+18% Margen)
                    </span>
                    <Badge variant="success">Alta Conversión</Badge>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Sugerir Cerveza IPA Artesanal con Double Bacon Smash eleva el ticket promedio en $3.500 con un solo clic.
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="primary" onClick={handleApplyTip} className="w-full">
                  <span>Aplicar sugerencia a la carta</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-center backdrop-blur-md">
            <span className="block text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Versión</span>
            <span className="text-xs font-black text-amber-400">brew.cl 2.0</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
