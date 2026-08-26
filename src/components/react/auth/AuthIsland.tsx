import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, User, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Props {
  initialMode?: 'login' | 'register';
}

export default function AuthIsland({ initialMode = 'login' }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulación de autenticación exitosa
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('bun_user_session', JSON.stringify({
        email: email || 'demo@restaurant.com',
        name: name || 'Chef Propietario',
        tenantId: 'tenant_001',
        token: `jwt_${Date.now()}`
      }));

      if (mode === 'register') {
        window.location.href = '/onboarding';
      } else {
        window.location.href = '/admin';
      }
    }, 800);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('bun_user_session', JSON.stringify({
        email: 'usuario.google@restaurant.com',
        name: 'Usuario Google',
        tenantId: 'tenant_001',
        provider: 'google',
        token: `jwt_google_${Date.now()}`
      }));

      if (mode === 'register') {
        window.location.href = '/onboarding';
      } else {
        window.location.href = '/admin';
      }
    }, 700);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <a href="/" className="inline-flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-400 flex items-center justify-center text-xl shadow-lg shadow-brand-500/30">
            🍔
          </div>
          <span className="text-2xl font-black text-white tracking-tight">BUN</span>
        </a>
        <h1 className="text-2xl font-extrabold text-white">
          {mode === 'login' ? '¡Bienvenido de vuelta!' : 'Crea tu menú gratis'}
        </h1>
        <p className="text-xs text-slate-400">
          {mode === 'login'
            ? 'Ingresa a tu panel de administración gastronómica'
            : 'Configura tu restaurante en menos de 2 minutos'}
        </p>
      </div>

      {/* Auth Card */}
      <div className="p-8 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl space-y-6">
        
        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-3 transition shadow-sm active:scale-[0.99]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{mode === 'login' ? 'Continuar con Google' : 'Registrarse con Google'}</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-800"></div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">o con tu correo</span>
          <div className="flex-1 h-px bg-slate-800"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Tu Nombre o Restaurante</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Juan Pérez / Burger Queen"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chef@tu-restaurante.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-300">Contraseña</label>
              {mode === 'login' && (
                <a href="#" className="text-[11px] font-semibold text-brand-400 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition active:scale-[0.98] mt-2"
          >
            <span>{loading ? 'Procesando...' : mode === 'login' ? 'Entrar a mi Panel' : 'Crear Cuenta y Continuar'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center pt-2">
          {mode === 'login' ? (
            <p className="text-xs text-slate-400">
              ¿Aún no tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-brand-400 hover:underline ml-1"
              >
                Regístrate gratis
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-400">
              ¿Ya tienes cuenta registrada?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-brand-400 hover:underline ml-1"
              >
                Inicia sesión aquí
              </button>
            </p>
          )}
        </div>

      </div>

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Tus datos y pedidos están 100% seguros y encriptados</span>
      </div>
    </div>
  );
}
