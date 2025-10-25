import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

export default function Configuracion() {
  const { user, updateUser } = useAuth();

  const storedUser = user || JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');

  const [nombre, setNombre] = useState(storedUser?.nombre || '');
  const [email] = useState(storedUser?.email || '');
  const [avatarPreview, setAvatarPreview] = useState(storedUser?.avatar || '');

  const [theme, setTheme] = useState(localStorage.getItem('vocacional_theme') || 'dark');
  const [language, setLanguage] = useState(localStorage.getItem('vocacional_lang') || 'es');
  const [autosave, setAutosave] = useState((localStorage.getItem('vocacional_autosave') === 'true'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vocacional_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('vocacional_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('vocacional_autosave', autosave ? 'true' : 'false');
  }, [autosave]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona una imagen válida');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    const updated = {
      ...storedUser,
      nombre: nombre,
      avatar: avatarPreview,
    };
    updateUser(updated);
    toast.success('Perfil actualizado');
  };

  const handleSavePreferences = () => {
    toast.success('Preferencias guardadas');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Configuración</h2>

      <section className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Perfil de usuario</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="col-span-2 space-y-3">
            <label className="block text-sm text-gray-300">Nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-3 py-2 rounded bg-black/40 border border-gray-700 text-white outline-none" />

            <label className="block text-sm text-gray-300">Email</label>
            <input value={email} readOnly className="w-full px-3 py-2 rounded bg-black/20 border border-gray-700 text-gray-400" />

            <div className="pt-2">
              <button onClick={handleSaveProfile} className="bg-gradient-to-r from-[#e99b63] to-[#ff8c42] text-black px-4 py-2 rounded font-semibold">Guardar cambios</button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden mb-3 border-2 border-gray-700">
              <img src={avatarPreview || '/GorroLogo.png'} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="text-sm text-gray-300" />
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Preferencias</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300 font-medium">Tema</p>
              <p className="text-sm text-gray-500">Elige el tema de la aplicación</p>
            </div>
            <div className="flex items-center space-x-2">
              <select value={theme} onChange={(e) => setTheme(e.target.value)} className="px-3 py-2 rounded bg-black/40 border border-gray-700 text-white">
                <option value="dark">Oscuro</option>
                <option value="light">Claro</option>
                <option value="system">Sistema</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300 font-medium">Idioma</p>
              <p className="text-sm text-gray-500">Selecciona el idioma</p>
            </div>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-3 py-2 rounded bg-black/40 border border-gray-700 text-white">
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300 font-medium">Guardado automático de test</p>
              <p className="text-sm text-gray-500">Guardar resultados localmente al completar un test</p>
            </div>
            <label className="inline-flex items-center space-x-2">
              <input type="checkbox" checked={autosave} onChange={(e) => setAutosave(e.target.checked)} className="form-checkbox h-5 w-5 text-[#e99b63] bg-black/40 rounded" />
            </label>
          </div>

          <div className="pt-2">
            <button onClick={handleSavePreferences} className="bg-white text-[#e99b63] px-4 py-2 rounded font-semibold">Guardar preferencias</button>
          </div>
        </div>
      </section>
    </div>
  );
}
