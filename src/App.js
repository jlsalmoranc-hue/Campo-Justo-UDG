import React, { useState } from 'react';
import './index.css';

function App() {
  // Controla si estamos en vista de 'login' o 'registro'
  const [vista, setVista] = useState('login');
  
  // Estados para los formularios (CJ-01: Tareas 1 y 2)
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState('Campesino');
  const [mensajeVista, setMensajeVista] = useState('');

  const rolesDisponibles = [
    { id: 'Campesino', nombre: 'Campesino', icono: '🌾' },
    { id: 'Locatario', nombre: 'Locatario', icono: '🏪' },
    { id: 'Transportista', nombre: 'Transportista', icono: '🚚' }
  ];

  const handleSimularEnvio = (e) => {
    e.preventDefault();
    if (vista === 'registro') {
      setMensajeVista(
        `Vista previa de diseño (CJ-01 T1/T2): Formulario listo para registrar a "${nombre || 'Usuario'}" con el rol "${rolSeleccionado}". (Validación y guardado programados para Tarea 3).`
      );
    } else {
      setMensajeVista(
        `Vista previa de diseño (CJ-01 T1/T2): Formulario de acceso listo para correo "${correo || 'usuario@campojusto.mx'}" bajo el rol "${rolSeleccionado}". (Autenticación programada para Tarea 4).`
      );
    }
  };

  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
    setMensajeVista('');
  };

  return (
    <div className="app-container">
      <div className="card">
        <div className="brand-header">
          <span className="badge-sprint">Sprint 1 • CJ-01 (Tareas 1 y 2)</span>
          <h1 className="brand-title">Campo Justo Puebla</h1>
          <p className="brand-subtitle">Comercialización agrocomercial directa sin intermediarios</p>
        </div>

        <h2 className="form-title">
          {vista === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </h2>

        <form onSubmit={handleSimularEnvio}>
          {vista === 'registro' && (
            <div className="form-group">
              <label className="form-label" htmlFor="nombre">Nombre completo</label>
              <input
                id="nombre"
                type="text"
                autoComplete="name"
                className="form-input"
                placeholder="Ej. Juan Pérez Hernández"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              autoComplete="email"
              className="form-input"
              placeholder="ejemplo@campojusto.mx"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              autoComplete={vista === 'login' ? 'current-password' : 'new-password'}
              className="form-input"
              placeholder={vista === 'login' ? 'Ingresa tu contraseña' : 'Crea una contraseña'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* CJ-01 / TAREA 2: Selector de Rol (Campesino, Locatario o Transportista) */}
          <div className="form-group">
            <span className="form-label" style={{ display: "block" }}>Selecciona tu rol en la cadena:</span>
            <div className="role-grid">
              {rolesDisponibles.map((rol) => (
                <div
                  key={rol.id}
                  className={`role-card ${rolSeleccionado === rol.id ? 'active' : ''}`}
                  onClick={() => setRolSeleccionado(rol.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setRolSeleccionado(rol.id);
                    }
                  }}
                  role="button"
                  aria-pressed={rolSeleccionado === rol.id}
                  tabIndex={0}
                >
                  <span className="role-icon">{rol.icono}</span>
                  <span className="role-name">{rol.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="btn-group">
            {vista === 'login' ? (
              <>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => cambiarVista('registro')}
                >
                  Crear cuenta
                </button>
                <button type="submit" className="btn-primary">
                  Iniciar sesión
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => cambiarVista('login')}
                >
                  Regresar al inicio
                </button>
                <button type="submit" className="btn-primary">
                  Registrarme
                </button>
              </>
            )}
          </div>
        </form>

        {mensajeVista && (
          <div className="feedback-banner">
            {mensajeVista}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
