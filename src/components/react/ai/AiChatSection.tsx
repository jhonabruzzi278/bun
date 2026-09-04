import React, { useState } from 'react';
import { Send, Zap, Lightbulb, ArrowRight, Flame } from 'lucide-react';
import { Button, Badge, Card } from '@/components/ui';

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
    text: '¡Hola Maestro Cervecero! Soy **Brew** 🦉🍺, la lechuza copiloto gastronómica de **brew.cl**. Con mi visión analítica aguda, he analizado tus comandas y detecté 3 oportunidades tácticas para elevar el margen promedio de tu carta.',
    timestamp: '14:15',
    action: {
      label: 'Ver 3 sugerencias de margen',
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
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsThinking(true);

    setTimeout(() => {
      let botResponse = '';
      let actionLabel = '';

      if (text.includes('ticket promedio') || text.includes('fin de semana')) {
        botResponse = `🦉 **Estrategia para Fin de Semana en ${businessName}:**\n1. **Maridaje en Barra**: Sugerir una IPA artesanal con las Hamburguesas Smash (+18% ticket).\n2. **Postre Exprés**: Añadir café espresso de especialidad a mitad de precio con el cheesecake.\n3. **Upselling de Papas**: Sugerir doble queso cheddar por $1.200 al confirmar comanda.`;
        actionLabel = 'Aplicar promociones recomendadas';
      } else if (text.includes('descripción') || text.includes('seductora')) {
        botResponse = `🦉 **Copy Gastronómico de Alta Conversión:**\n"Doble medallón smash premium prensado a fuego vivo sobre plancha de hierro, corteza caramelizada con cebolla braseada, queso cheddar fundido y tocino crujiente en pan brioche tostado con mantequilla artesanal."`;
        actionLabel = 'Copiar al portapapeles';
      } else if (text.includes('margen')) {
        botResponse = `🦉 **Top 2 Platos con Mayor Contribución:**\n1. **Papas Rústicas Cheddar**: Margen del 74% (Costo $1.150 / Precio $4.490).\n2. **Café Flat White**: Margen del 81% (Costo $650 / Precio $3.490).\nRecomiendo colocarlos en la cabecera visual de tu Menú QR.`;
        actionLabel = 'Destacar en carta';
      } else {
        botResponse = `🦉 **Diagnóstico de Brew:** He recibido tu consulta: "${text}". Basado en los patrones de consumo nocturnos de ${businessName}, optimizar la rotación de mesas entre las 20:30 y 22:30 generará un impacto directo en tus ventas netas.`;
        actionLabel = 'Ver desglose';
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: { label: actionLabel, type: 'strategy' },
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat Window */}
      <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-[#121215] border border-neutral-200 dark:border-white/[0.08] shadow-sm flex flex-col h-[560px] overflow-hidden">
        {/* Messages */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 text-white flex items-center justify-center text-base shrink-0 shadow-sm">
                  🦉
                </div>
              )}

              <div
                className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-black font-semibold rounded-tr-none shadow-sm'
                    : 'bg-neutral-50 dark:bg-white/[0.04] text-neutral-900 dark:text-zinc-100 border border-neutral-200 dark:border-white/[0.08] rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.action && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => alert(`Acción ejecutada: ${msg.action?.label}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-bold text-[11px] transition border border-amber-500/30"
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
            <div className="flex gap-3 items-center text-xs text-zinc-400 italic">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 text-white flex items-center justify-center text-base animate-bounce">
                🦉
              </div>
              <span>Brew la lechuza está calculando la mejor recomendación...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-neutral-200 dark:border-white/[0.08] bg-neutral-50/70 dark:bg-[#0E0E11]/80 backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Pregúntale a Brew sobre tus ventas nocturnas, platos, combos o precios..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-white/[0.08] text-xs text-neutral-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
            />
            <Button
              type="submit"
              variant="primary"
              size="default"
              disabled={!inputPrompt.trim() || isThinking}
            >
              <span>Enviar</span>
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      </div>

      {/* Quick Prompts & Alerts Sidebar */}
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#121215] border border-neutral-200 dark:border-white/[0.08] shadow-sm space-y-3">
          <h3 className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Consultas Rápidas Sugeridas
          </h3>

          <div className="space-y-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="w-full text-left p-3 rounded-2xl bg-neutral-50 dark:bg-white/[0.04] hover:bg-neutral-100 dark:hover:bg-white/[0.08] border border-neutral-200 dark:border-white/[0.08] text-xs text-neutral-800 dark:text-zinc-200 transition-all duration-200 flex items-center justify-between group active:scale-[0.99]"
              >
                <span className="line-clamp-2 leading-relaxed">{q}</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
