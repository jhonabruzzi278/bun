import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, User } from 'lucide-react';

interface Props {
  initialMode?: 'login' | 'register';
}

export default function AuthIsland({ initialMode = 'login' }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('bun_user_session', JSON.stringify({
        email: email || 'demo@pidelisto.cl',
        name: name || 'Juan Doe',
        tenantId: 'tenant_001',
        token: `jwt_${Date.now()}`
      }));

      window.location.href = '/admin';
    }, 600);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <a href="/" className="inline-flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-color4 text-white flex items-center justify-center text-xl shadow-md font-bold">
            ☕
          </div>
          <span className="text-2xl font-black text-coffee-950 dark:text-white tracking-tight">Pidelisto</span>
        </a>
        <h1 className="text-2xl font-extrabold text-coffee-950 dark:text-white">
          {mode === 'login' ? '¡Bienvenido de vuelta!' : 'Crea tu cuenta de restaurante'}
        </h1>
        <p className="text-xs text-[#70645A] dark:text-[#A8988B]">
          {mode === 'login'
            ? 'Ingresa a tu panel de administración gastronómica'
            : 'Comienza a gestionar tu carta y comandas en minutos'}
        </p>
      </div>

      {/* Auth Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm space-y-6 transition-colors">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1.5">Tu Nombre y Apellido</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8C7E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Juan Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1.5">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C7E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="juan@pidelisto.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1.5">Contraseña</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C7E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-color4 hover:bg-[#522B2B] dark:bg-color3 dark:hover:bg-color4 text-white font-bold text-xs shadow-coffee-sm flex items-center justify-center gap-2 transition"
          >
            <span>{loading ? 'Validando...' : mode === 'login' ? 'Entrar al Sistema' : 'Crear Cuenta'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-[#70645A] dark:text-[#A8988B]">
          {mode === 'login' ? (
            <span>
              ¿No tienes una cuenta aún?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-color4 dark:text-color2 font-bold hover:underline"
              >
                Crear cuenta
              </button>
            </span>
          ) : (
            <span>
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-color4 dark:text-color2 font-bold hover:underline"
              >
                Iniciar sesión
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
