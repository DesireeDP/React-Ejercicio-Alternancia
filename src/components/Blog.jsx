import React, { useState } from 'react';
import PostCard from './PostCard';
import './Blog.css';

// Publicaciones iniciales de ejemplo para que la sección del blog luzca espectacular e inmersiva desde el primer momento
const INITIAL_POSTS = [
  {
    id: 1,
    title: "Crónicas de Sangre: El Despertar",
    description: "Un repaso histórico y legendario por los linajes ancestrales que gobernaron los valles brumosos antes del amanecer de la era moderna.",
    isFeatured: true,
    date: "21 de mayo de 2026"
  },
  {
    id: 2,
    title: "Rituales bajo la Luna de Sangre",
    description: "Una guía mística paso a paso para canalizar el poder de los eclipses y purificar amuletos sagrados utilizando la energía nocturna.",
    isFeatured: false,
    date: "20 de mayo de 2026"
  }
];

/**
 * ¡Bienvenido al Componente Blog!
 * Este componente es el centro neurálgico de nuestro pequeño CMS (Sistema de Gestión de Contenido).
 * Aquí gestionamos el formulario para crear nuevas crónicas y listamos dinámicamente los posts.
 * Hemos escrito comentarios muy cercanos en castellano para que entiendas la lógica de cabo a rabo. ¡A por ello!
 */
function Blog() {
  // Estado que almacena la lista completa de nuestras publicaciones
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // Estados locales para los campos del formulario de creación
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Controladores de validación: errores y campos que ya han sido clicados (touched)
  const [errors, setErrors] = useState({ title: '', description: '' });
  const [touched, setTouched] = useState({ title: false, description: false });

  // Función de ayuda para validar un campo específico en tiempo real
  const validateField = (name, value) => {
    let error = '';
    if (name === 'title') {
      if (!value.trim()) {
        error = '¡Ups! Necesitamos un título para tu crónica gótica.';
      } else if (value.trim().length < 5) {
        error = 'El título es un poco corto, pon al menos 5 letras.';
      }
    }
    if (name === 'description') {
      if (!value.trim()) {
        error = 'La descripción es obligatoria, ¡no dejes el misterio incompleto!';
      } else if (value.trim().length < 10) {
        error = 'Danos un poco más de detalle (mínimo 10 caracteres).';
      }
    }
    return error;
  };

  // Manejador del cambio en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setNewTitle(value);
      if (touched.title) {
        setErrors((prev) => ({ ...prev, title: validateField('title', value) }));
      }
    } else if (name === 'description') {
      setNewDescription(value);
      if (touched.description) {
        setErrors((prev) => ({ ...prev, description: validateField('description', value) }));
      }
    }
  };

  // Manejador de la pérdida de foco (cuando el usuario sale del input)
  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Guardar y añadir una nueva publicación al listado
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitamos que recargue la página, ¡somos una SPA premium!

    // Validamos todo una última vez antes de dar luz verde
    const titleError = validateField('title', newTitle);
    const descError = validateField('description', newDescription);

    setTouched({ title: true, description: true });
    setErrors({ title: titleError, description: descError });

    // Si todo está correcto y libre de errores... ¡creamos el post!
    if (!titleError && !descError) {
      // Creamos una bonita fecha en español
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = new Date().toLocaleDateString('es-ES', options);

      const newPost = {
        id: Date.now(), // Un ID único usando el timestamp actual
        title: newTitle.trim(),
        description: newDescription.trim(),
        isFeatured: false, // Por defecto empieza sin destacar
        date: formattedDate
      };

      // Añadimos el nuevo post AL PRINCIPIO de la lista para una experiencia de usuario increíble
      setPosts([newPost, ...posts]);

      // Reseteamos el formulario y los estados de validación
      setNewTitle('');
      setNewDescription('');
      setTouched({ title: false, description: false });
      setErrors({ title: '', description: '' });
    }
  };

  // Función para ELIMINAR una publicación específica del listado
  const handleDeletePost = (id) => {
    // Filtramos la lista, dejando fuera la tarjeta con el ID que queremos quitar
    setPosts(posts.filter((post) => post.id !== id));
  };

  // Función para DESTACAR o quitar el destaque de un post
  const handleToggleHighlight = (id) => {
    setPosts(
      posts.map((post) => 
        post.id === id ? { ...post, isFeatured: !post.isFeatured } : post
      )
    );
  };

  // Función para EDITAR y guardar los cambios de un post
  const handleUpdatePost = (id, updatedTitle, updatedDescription) => {
    setPosts(
      posts.map((post) => 
        post.id === id 
          ? { ...post, title: updatedTitle, description: updatedDescription } 
          : post
      )
    );
  };

  return (
    <section className="blog-section" id="blog-seccion">
      {/* Título de la sección del blog */}
      <h2 className="blog-section-title">Crónicas de la Oscuridad (Blog)</h2>
      <p className="blog-section-subtitle">
        Comparte tus pensamientos, visiones o reporta avistamientos misteriosos. 
        Nuestros susurros se añaden dinámicamente y se gestionan en tiempo real.
      </p>

      {/* Formulario de Creación */}
      <div className="blog-form-container">
        <h3>Escribir una Nueva Crónica</h3>
        
        <form onSubmit={handleSubmit} className="blog-creation-form" noValidate>
          {/* Título del Post */}
          <div className="blog-form-group">
            <label htmlFor="post-title">Título de la Crónica</label>
            <input
              type="text"
              id="post-title"
              name="title"
              placeholder="Ej. Cacería en la Bruma..."
              value={newTitle}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={touched.title && errors.title ? 'is-invalid' : touched.title && !errors.title ? 'is-valid' : ''}
            />
            {touched.title && errors.title && <span className="blog-error-message">{errors.title}</span>}
          </div>

          {/* Descripción del Post */}
          <div className="blog-form-group">
            <label htmlFor="post-description">Cuerpo o Descripción</label>
            <textarea
              id="post-description"
              name="description"
              placeholder="Describe los detalles de tu visión o acontecimiento aquí..."
              value={newDescription}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              rows="4"
              className={touched.description && errors.description ? 'is-invalid' : touched.description && !errors.description ? 'is-valid' : ''}
            />
            {touched.description && errors.description && <span className="blog-error-message">{errors.description}</span>}
          </div>

          {/* Botón de envío */}
          <button type="submit" className="blog-submit-btn" aria-label="Añadir nueva crónica al blog">
            Publicar en el Eter
          </button>
        </form>
      </div>

      {/* Grid Listado de Posts */}
      <div className="blog-posts-container">
        <h3 className="blog-list-title">Crónicas Registradas</h3>
        
        {posts.length === 0 ? (
          <div className="blog-empty-state">
            <p>👻 No quedan crónicas en el éter... escribe una nueva arriba para iniciar la leyenda.</p>
          </div>
        ) : (
          <div className="blog-posts-grid">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDeletePost}
                onToggleHighlight={handleToggleHighlight}
                onUpdate={handleUpdatePost}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;
