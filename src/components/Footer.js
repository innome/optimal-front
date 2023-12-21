import React from 'react';

function Footer() {
  return (
    <footer>
      {/* Asegúrate de que el color del texto sea visible sobre el fondo donde se renderizará el footer */}
      <p>© 2023 OptimAl. Todos los derechos reservados.</p>
      <nav>
        <a href="#about">Acerca de</a>
        <a href="#contact">Contacto</a>
      </nav>
    </footer>
  );
}

export default Footer;
