import React from 'react';

function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
      {/* Aquí puedes agregar más contenido para cada sección */}
    </section>
  );
}

export default Section;
