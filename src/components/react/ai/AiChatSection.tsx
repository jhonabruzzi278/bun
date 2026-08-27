import React, { useState } from 'react';
import { Send, Zap, Lightbulb, ArrowRight, Flame } from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    type: string;
  };
}

interface AiChatSectionProps {
  businessName: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: '¡Hola Maestro Cervecero! Soy **Chef Bunito** 🐻‍🍳, tu copiloto gastronómico con IA. He analizado las ventas de hoy y tengo 3 oportunidades detectadas para aumentar tu margen.',
    timestamp: '14:15',
    action: {
      label: 'Ver 3 oportunidades de margen',
      type: 'insights'
    }
  }
];

export default function AiChatSection({ businessName }: AiChatSectionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const quickQuestions = [
    '¿Cómo aumento mi ticket promedio este fin de semana?',
    'Genera una descripción seductora para mi plato estrella',
    '¿Cuáles son mis 2 platos con mayor margen?',
    'Crea un combo promocional para la noche'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsThinking(true);

    setTimeout(() => {
      let botResponse = '';
      let botAction: { label: string; type: string } | undefined;

      const lower = text.toLowerCase();
      if (lower.includes('ticket') || lower.includes('promedio') || lower.includes('aumento')) {
        botResponse = `💡 **Estrategia para elevar el Ticket Promedio (+22% estimado):**\n\n1. **Upselling de Extras en Carta Digital:** Tu plato más pedido es *Double Bacon Smash* ($7.990). Si activamos por defecto la sugerencia de *+ Queso Cheddar Extra* ($600) y *+ Tocino Crocante* ($990), 4 de cada 10 comensales lo aceptan.\n2. **Maridaje en 1 Clic:** Ofrecer la *Cerveza IPA Artesanal* ($4.200) con descuento de $500 al pedir una hamburguesa smash.\n\n¿Quieres que apliquemos la sugerencia de maridaje al menú ahora?`;
        botAction = { label: 'Activar combo sugerido en la carta', type: 'apply_combo' };
      } else if (lower.includes('descripción') || lower.includes('seductora') || lower.includes('plato')) {
        botResponse = `✨ **Propuesta de Copy Gastronómico Gourmet:**\n\n_"Dos discos jugosos de auténtica carne Angus aplastados al hierro candente con costra caramelizada perfecta, fundidos en generosas capas de queso cheddar madurado, tocino crujiente ahumado en madera de roble y nuestra emulsión secreta artesanal. Servido en esponjoso pan brioche tostado a la mantequilla."_\n\n¿Deseas guardarla como descripción oficial del plato?`;
        botAction = { label: 'Actualizar plato en el catálogo', type: 'update_desc' };
      } else if (lower.includes('margen') || lower.includes('rentabilidad')) {
        botResponse = `📊 **Análisis de Margen de Contribución:**\n\n⭐ **Plato #1 Más Rentable:** *Pizza Pepperoni Rústica* (Margen bruto estimado: **72%**).\n⭐ **Plato #2 Más Rentable:** *Double Bacon Smash* (Margen bruto: **68%**).\n\n⚠️ **Alerta de Oportunidad:** Las *Papas Rústicas* tienen alta rotación pero su costo de aceite subió un 8%. Te sugiero ajustar su precio de $4.490 a **$4.890** para recuperar $400 por comensal sin afectar la demanda.`;
        botAction = { label: 'Ajustar precio de papas a $4.890', type: 'price_adjust' };
      } else {
        botResponse = `🐻‍🍳 **Chef Bunito analizando:** He revisado los parámetros de tu restaurante *${businessName}*. Para optimizar el turno actual, te recomiendo impulsar las bebidas artesanales y verificar que la estación de parrilla tenga listo el mise en place para la hora punta (20:30 hrs).`;
        botAction = { label: 'Ver tablero KDS de cocina', type: 'go_kitchen' };
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: botAction
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
    }, 900);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat Window */}
      <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm flex flex-col h-[560px] overflow-hidden">
        {/* Messages */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-xl bg-color4 text-white flex items-center justify-center text-base shrink-0">
                  🐻‍🍳
                </div>
              )}

              <div
                className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-color4 text-white rounded-tr-none shadow-sm'
                    : 'bg-[#FAF7F2] dark:bg-[#180E0C] text-coffee-950 dark:text-[#E8DFD8] border border-[#EAE1D6] dark:border-[#3D2420] rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.action && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => alert(`Acción ejecutada: ${msg.action?.label}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-color3 hover:bg-color4 text-white font-bold text-[11px] transition shadow-sm"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{msg.action.label}</span>
                    </button>
                  </div>
                )}

                <span className="block text-[10px] opacity-60 text-right">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-3 items-center text-xs text-[#8C7E73] dark:text-[#A8988B] italic">
              <div className="w-8 h-8 rounded-xl bg-color4 text-white flex items-center justify-center text-base animate-bounce">
                🐻‍🍳
              </div>
              <span>Chef Bunito está calculando la mejor recomendación...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#EAE1D6] dark:border-[#3D2420] bg-[#FAF7F2] dark:bg-[#180E0C]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Pregúntale a Chef Bunito sobre tus ventas, platos, combos o precios..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] text-xs text-coffee-950 dark:text-white placeholder-[#8C7E73] focus:outline-none focus:border-color4"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isThinking}
              className="px-4 py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] text-white font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <span>Enviar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Quick Prompts & Alerts Sidebar */}
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-3">
          <h3 className="text-xs font-extrabold text-coffee-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-color3 dark:text-color2" />
            Consultas Rápidas Sugeridas
          </h3>

          <div className="space-y-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="w-full text-left p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] hover:bg-[#F3EDE3] dark:hover:bg-[#2D1B18] border border-[#EAE1D6] dark:border-[#3D2420] text-xs text-coffee-950 dark:text-[#E8DFD8] font-medium transition flex items-center justify-between group"
              >
                <span className="line-clamp-1">{q}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C7E73] group-hover:translate-x-0.5 transition" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-3">
          <h3 className="text-xs font-extrabold text-coffee-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            Alertas en Tiempo Real
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#E7F3E8] dark:bg-[#1A3320] border border-[#D0EBD2] dark:border-[#2E5936] text-[#2E7D32] dark:text-[#4ADE80]">
              <span className="font-bold block">🔥 Smash Burger en alza (+28%)</span>
              <span className="text-[11px] opacity-90">Stock de pan brioche suficiente para 4 horas.</span>
            </div>

            <div className="p-3 rounded-xl bg-[#FEF8E3] dark:bg-[#33220E] border border-[#FDECB8] dark:border-[#593E1A] text-[#B1813B] dark:text-[#FBBF24]">
              <span className="font-bold block">⚠️ Hora punta 20:30 hrs</span>
              <span className="text-[11px] opacity-90">Se proyectan 32 pedidos en 45 minutos.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
