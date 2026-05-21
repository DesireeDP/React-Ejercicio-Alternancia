import React, { useState } from 'react';

/**
 * ¡Hola! Este es nuestro componente estrella para cada una de las publicaciones (tarjetas) del blog.
 * Lo hemos hecho independiente para que sea súper limpio y fácil de mantener.
 * 
 * Recibe como "props" la información de la publicación y las funciones del padre para editar, 
 * eliminar o destacar. ¡Vamos a ver cómo funciona la magia!
 */
function PostCard({ post, onDelete, onToggleHighlight, onUpdate }) {
  // Con este estado decidimos si la tarjeta se muestra normal o en modo "edición inline"
  const [isEditing, setIsEditing] = useState(false);

  // Estados temporales para guardar los cambios que escribimos antes de guardarlos
  const [editTitle, setEditTitle] = useState(post.title);
  const [editDescription, setEditDescription] = useState(post.description);

  // Un pequeño estado para controlar que no dejemos campos vacíos al editar
  const [errors, setErrors] = useState({ title: '', description: '' });

  // Esta función activa el modo edición y precarga los textos actuales en nuestros estados temporales
  const handleStartEdit = () => {
    setEditTitle(post.title);
    setEditDescription(post.description);
    setErrors({ title: '', description: '' }); // Limpiamos errores anteriores
    setIsEditing(true);
  };

  // Si nos arrepentimos, cancelamos y volvemos al estado normal
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Al pulsar "Guardar", validamos los datos antes de avisar al componente padre
  const handleSave = () => {
    let hasErrors = false;
    const newErrors = { title: '', description: '' };

    if (!editTitle.trim()) {
      newErrors.title = '¡Vaya! El título no puede quedarse vacío.';
      hasErrors = true;
    }

    if (!editDescription.trim()) {
      newErrors.description = 'Cuéntanos algo, la descripción es obligatoria.';
      hasErrors = true;
    }

    setErrors(newErrors);

    // Si todo está bien, llamamos a la función de actualizar del padre y cerramos la edición
    if (!hasErrors) {
      onUpdate(post.id, editTitle.trim(), editDescription.trim());
      setIsEditing(false);
    }
  };

  // Renderizado condicional: si 'isEditing' es verdadero, mostramos los inputs para editar
  if (isEditing) {
    return (
      <div className="blog-post-card is-editing">
        <h4 className="card-edit-title">Modificando la Crónica</h4>
        
        <div className="card-edit-form">
          {/* Campo del Título */}
          <div className="card-edit-group">
            <label htmlFor={`edit-title-${post.id}`}>Título</label>
            <input
              id={`edit-title-${post.id}`}
              type="text"
              className={errors.title ? 'input-error' : ''}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            {errors.title && <span className="card-error-text">{errors.title}</span>}
          </div>

          {/* Campo de la Descripción */}
          <div className="card-edit-group">
            <label htmlFor={`edit-desc-${post.id}`}>Descripción</label>
            <textarea
              id={`edit-desc-${post.id}`}
              className={errors.description ? 'input-error' : ''}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows="3"
            />
            {errors.description && <span className="card-error-text">{errors.description}</span>}
          </div>

          {/* Botones de acción en la edición */}
          <div className="card-edit-actions">
            <button className="btn-save" onClick={handleSave} aria-label="Guardar cambios">
              Guardar
            </button>
            <button className="btn-cancel" onClick={handleCancelEdit} aria-label="Cancelar cambios">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // De lo contrario, si no estamos editando, mostramos la tarjeta normal y bonita
  return (
    <div className={`blog-post-card ${post.isFeatured ? 'is-featured' : ''}`}>
      {/* Si el post está destacado, le ponemos una corona dorada brillante */}
      {post.isFeatured && (
        <div className="card-featured-badge">
          <span className="badge-icon">👑</span> Destacado
        </div>
      )}

      <div className="card-body">
        <h3 className="card-title">{post.title}</h3>
        <p className="card-description">{post.description}</p>
        <span className="card-date">{post.date}</span>
      </div>

      {/* Botones de acción inferiores */}
      <div className="card-footer-actions">
        {/* Botón para destacar (cambiar el estado de estrellita) */}
        <button 
          className={`btn-action btn-feature ${post.isFeatured ? 'active' : ''}`}
          onClick={() => onToggleHighlight(post.id)}
          aria-label={post.isFeatured ? "Quitar destaque" : "Destacar publicación"}
        >
          {post.isFeatured ? '⭐ Destacado' : '☆ Destacar'}
        </button>

        {/* Botón para editar */}
        <button 
          className="btn-action btn-edit" 
          onClick={handleStartEdit}
          aria-label="Editar publicación"
        >
          ✏️ Editar
        </button>

        {/* Botón para eliminar */}
        <button 
          className="btn-action btn-delete" 
          onClick={() => onDelete(post.id)}
          aria-label="Eliminar publicación"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}

export default PostCard;
