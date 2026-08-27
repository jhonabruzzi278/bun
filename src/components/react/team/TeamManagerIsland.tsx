import React, { useState } from 'react';
import {
  UserPlus,
  Trash2,
  CheckCircle2,
  X
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'WAITER' | 'KITCHEN' | 'RIDER' | 'CASHIER';
  status: 'ACTIVE' | 'INVITED';
}

const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'usr_1',
    name: 'Jonathan Guerra',
    email: 'jonathan@pidelisto.cl',
    phone: '+56938980598',
    role: 'ADMIN',
    status: 'ACTIVE',
  },
  {
    id: 'usr_2',
    name: 'Carlos Gómez',
    email: 'carlos@pidelisto.cl',
    phone: '+56912345678',
    role: 'WAITER',
    status: 'ACTIVE',
  },
  {
    id: 'usr_3',
    name: 'María Fernández',
    email: 'maria@pidelisto.cl',
    phone: '+56987654321',
    role: 'KITCHEN',
    status: 'ACTIVE',
  },
];

export default function TeamManagerIsland() {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState<'ADMIN' | 'WAITER' | 'KITCHEN' | 'RIDER' | 'CASHIER' | ''>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+56');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(false);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !name || !email) return;

    const newMember: TeamMember = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      role: role as any,
      status: 'ACTIVE',
    };

    setTeam((prev) => [...prev, newMember]);
    setShowModal(false);
    setName('');
    setEmail('');
    setPassword('');
    setRole('');
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const getRoleBadge = (r: string) => {
    switch (r) {
      case 'ADMIN':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF7F2] dark:bg-[#38201C] text-color4 dark:text-color2 border border-[#EAE1D6] dark:border-[#4D2D26]">
            Propietario / Admin
          </span>
        );
      case 'WAITER':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F5F3FF] dark:bg-[#2A1B3D] text-[#7C3AED] dark:text-[#C084FC] border border-[#DDD6FE] dark:border-[#4C2882]">
            Mesero / Salón
          </span>
        );
      case 'KITCHEN':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF8E3] dark:bg-[#33220E] text-[#A0740E] dark:text-[#FBBF24] border border-[#FDECB8] dark:border-[#593E1A]">
            Cocina / KDS
          </span>
        );
      case 'RIDER':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] dark:bg-[#1A2640] text-[#2563EB] dark:text-[#60A5FA] border border-[#DBEAFE] dark:border-[#2A4373]">
            Repartidor
          </span>
        );
      case 'CASHIER':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E7F3E8] dark:bg-[#1A3320] text-[#2E7D32] dark:text-[#4ADE80] border border-[#D0EBD2] dark:border-[#2C5935]">
            Cajero / POS
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-coffee-950 dark:text-white tracking-tight">
            Equipo y Roles
          </h1>
          <p className="text-xs sm:text-sm text-[#70645A] dark:text-[#A8988B] mt-1">
            Crea usuarios para meseros, cajeros, cocineros y administradores con permisos dedicados.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] dark:bg-color3 dark:hover:bg-color4 text-white font-bold text-xs shadow-coffee-sm transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>Crear usuario</span>
        </button>
      </div>

      {toast && (
        <div className="p-3.5 rounded-xl bg-[#E7F3E8] dark:bg-[#1A3320] border border-[#D0EBD2] dark:border-[#2C5935] text-[#2E7D32] dark:text-[#4ADE80] text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-[#2E7D32] dark:text-[#4ADE80] shrink-0" />
          <span>¡Usuario creado correctamente y listo para operar en el sistema!</span>
        </div>
      )}

      {/* Team List */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] shadow-coffee-sm divide-y divide-[#F4EFEA] dark:divide-[#331C18] space-y-3 transition-colors">
        {team.map((member) => (
          <div key={member.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] dark:bg-[#2F1B17] border border-[#EAE1D6] dark:border-[#4D2D26] text-color4 dark:text-color2 flex items-center justify-center font-extrabold text-xs">
                {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-xs font-bold text-coffee-950 dark:text-white flex items-center gap-2">
                  {member.name}
                  {member.status === 'ACTIVE' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                  )}
                </h4>
                <p className="text-[11px] text-[#70645A] dark:text-[#A8988B] mt-0.5">{member.email} • {member.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {getRoleBadge(member.role)}
              {member.role !== 'ADMIN' && (
                <button
                  type="button"
                  onClick={() => setTeam(team.filter((t) => t.id !== member.id))}
                  className="p-1.5 text-[#8C7E73] hover:text-rose-500 transition"
                  title="Eliminar usuario"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: Crear Usuario */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#241512] border border-[#EAE1D6] dark:border-[#3D2420] rounded-3xl w-full max-w-md p-6 sm:p-7 space-y-5 shadow-2xl animate-fade-in relative transition-colors">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-[#8C7E73] hover:text-coffee-950 dark:hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-coffee-950 dark:text-white tracking-tight">Crear usuario</h3>
              <p className="text-xs text-[#70645A] dark:text-[#A8988B] mt-0.5">Asigna el rol y credenciales para el acceso al panel.</p>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">Rol</label>
                <select
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4 font-semibold"
                >
                  <option value="" disabled>Seleccione un rol</option>
                  <option value="ADMIN">Administrador / Propietario</option>
                  <option value="WAITER">Mesero (App pedidos en mesa)</option>
                  <option value="CASHIER">Cajero (Punto de Venta POS)</option>
                  <option value="KITCHEN">Cocinero (Tablero Cocina KDS)</option>
                  <option value="RIDER">Repartidor (App Delivery)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">Nombre de usuario</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Carlos Gómez"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">Teléfono</label>
                <div className="flex gap-2">
                  <span className="px-3 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-[#70645A] dark:text-[#A8988B] text-xs font-bold flex items-center">
                    +56
                  </span>
                  <input
                    type="tel"
                    value={phone.replace('+56', '')}
                    onChange={(e) => setPhone(`+56${e.target.value}`)}
                    placeholder="912345678"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-coffee-950 dark:text-[#E8DFD8] mb-1">Contraseña</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#180E0C] border border-[#EAE1D6] dark:border-[#3D2420] text-coffee-950 dark:text-white text-xs focus:outline-none focus:border-color4"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#70645A] dark:text-[#A8988B] hover:text-coffee-950 dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-color4 hover:bg-[#522B2B] dark:bg-color3 dark:hover:bg-color4 text-white font-bold text-xs shadow-md transition"
                >
                  Crear usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
