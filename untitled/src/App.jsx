import { useState, useEffect, useMemo, useCallback } from 'react'
import './App.css'
import Dragon from './Dragon'
import { AiFillHome } from 'react-icons/ai'
import { FaUser, FaFolderOpen, FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa'
import { SiKotlin, SiCss3, SiJavascript, SiHtml5, SiAndroidstudio, SiGit, SiGithub, SiIntellijidea, SiWebstorm, SiAffinity } from 'react-icons/si'

const useTypewriter = (words, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timer;
    if (!isDeleting) {
      if (currentText.length < currentWord.length) {
        timer = setTimeout(() => setCurrentText(currentWord.slice(0, currentText.length + 1)), typeSpeed);
      } else {
        timer = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => setCurrentText(currentText.slice(0, -1)), deleteSpeed);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, pauseTime]);

  return currentText;
};

const nombresSeccion = Object.freeze({
  inicio: 'Inicio',
  acerca: 'Acerca de mí',
  proyectos: 'Proyectos',
  contacto: 'Contacto'
});

const bordesSeccion = Object.freeze({
  inicio: 'borde-rojo',
  acerca: 'borde-azul',
  proyectos: 'borde-verde',
  contacto: 'borde-blanco'
});

const angulosSeccion = Object.freeze({
  inicio: '0deg',
  acerca: '45deg',
  proyectos: '90deg',
  contacto: '135deg'
});

const lenguajes = [
  { nombre: 'HTML', icono: <SiHtml5 />, className: 'color-html' },
  { nombre: 'CSS', icono: <SiCss3 />, className: 'color-css' },
  { nombre: 'JS', icono: <SiJavascript />, className: 'color-js' },
  { nombre: 'Kotlin', icono: <SiKotlin />, className: 'color-kotlin' },
];

const herramientas1 = [
  { nombre: 'Git', icono: <SiGit />, className: 'color-git' },
  { nombre: 'GitHub', icono: <SiGithub />, className: 'color-github' },
  { nombre: 'WebStorm', icono: <SiWebstorm />, className: 'color-webstorm' },
];

const herramientas2 = [
  { nombre: 'Android Studio', icono: <SiAndroidstudio />, className: 'color-android-studio' },
  { nombre: 'IntelliJ IDEA', icono: <SiIntellijidea />, className: 'color-intellij' },
  { nombre: 'Affinity Designer', icono: <SiAffinity />, className: 'color-affinity' },
];

const InicioPanel = ({ setActivo }) => {
  const titulos = useMemo(() => ['Hello World', 'Hola Mundo'], []);
  const tituloAnimado = useTypewriter(titulos, 100, 50, 1500);

  return (
    <div className="contenedor-inicio">
      <img src="src/assets/contactoimg.jpg" alt="Imagen" className="imagen-inicio" />
      <div className="info-inicio">
        <h1 className="titulo-inicio-rgb">
          {tituloAnimado}
          <span className="cursor-typewriter">|</span>
        </h1>
        <div className="mini-descripcion">
          Hola. Soy Joseph Rodriguez, enfocado en diseñar y construir software que se vea bien y que le guste a los demás. Conoce los proyectos que he desarrollado
        </div>
        <div className="botones-inicio">
          <button
            className="inicio-boton"
            onClick={() => setActivo('proyectos')}
            type="button"
          >
            Ver mis proyectos
          </button>
          <button className="inicio-boton" type="button">
            Descargar CV
          </button>
        </div>
      </div>
    </div>
  );
};

const TecnologiaMarquee = ({ items, reverse = false }) => (
  <div className={`tecnologias-marquesina${reverse ? ' marquesina-inversa' : ''}`}>
    <div className="marquesina-track">
      {[...items, ...items, ...items].map((tech, index) => (
        <div
          className={`tecnologia-bloque ${tech.className}`}
          key={`${tech.nombre}-${index}`}
        >
          {tech.icono}
          <span>{tech.nombre}</span>
        </div>
      ))}
    </div>
  </div>
);

const AcercaPanel = () => {
  const nombres = useMemo(() => ['Joseph Rodriguez', 'Desarrollador Web y Mobile'], []);
  const textoAnimado = useTypewriter(nombres, 100, 50, 1500);

  return (
    <div className="contenedor-acerca">
      <div className="columna-texto">
        <h3 className="titulo-nombre texto-rgb">
          {textoAnimado}
          <span className="cursor-typewriter">|</span>
        </h3>
        <p className="parrafo-izquierda">Apasionado por Kotlin, Android y el desarrollo web, siempre busco aplicar las mejores prácticas para crear aplicaciones escalables, eficientes y bien estructuradas</p>
        <p className="parrafo-derecha">Estoy en formación constante, aprendiendo nuevas herramientas, frameworks y tecnologías para crecer como desarrollador mobile</p>
        <p className="parrafo-izquierda">Mi objetivo es construir apps útiles, intuitivas y visualmente atractivas, enfocadas en una buena experiencia de usuario</p>
        <p className="parrafo-derecha">Me gusta trabajar con orden, código limpio y una mentalidad enfocada en resolver problemas de forma práctica y creativa</p>
      </div>
      <div className="columna-tecnologias">
        <div className="contenedor-marquesinas">
          <div className="grupo-tecnologias">
            <h3 className="titulo-marquesina texto-rgb">Lenguajes</h3>
            <TecnologiaMarquee items={lenguajes} />
          </div>
          <div className="grupo-tecnologias">
            <h3 className="titulo-marquesina texto-rgb">IDEs y Herramientas</h3>
            <TecnologiaMarquee items={herramientas1} reverse />
            <TecnologiaMarquee items={herramientas2} reverse />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProyectosPanel = () => (
  <div className="grid-proyectos">
    {/* Tarjeta Calculadora Kotlin */}
    <div className="tarjeta-proyecto-calculadora tarjeta-proyecto-blur">
      <div className="calcu-barra-superior">
        <img src="src/assets/CalculadoraIcono.png" alt="Icono Calculadora" className="img-calculadora-icono" />
        <h3 className="calcu-nombre">Calculadora Kotlin</h3>
        <div className="calcu-barra-espaciador" />
        <a href="#" className="enlace-proyecto-calculadora" title="Ver en GitHub">
          <SiGithub />
        </a>
      </div>
      <div className="contenido-proyecto-calculadora">
        <div className="calcu-info calcu-info-izquierda">
          <div className="calcu-descripcion calcu-descripcion-izquierda">
            <p>Una simple calculadora hecha en Kotlin.</p>
          </div>
        </div>
        <div className="calcu-imagen">
          <img src="src/assets/CalculadoraUi.jpeg" alt="UI Calculadora" className="img-calculadora-ui" />
        </div>
      </div>
    </div>
    {/* Tarjeta App de Notas */}
    <div className="tarjeta-proyecto-notas tarjeta-proyecto-blur">
      <div className="calcu-barra-superior">
        <img src="https://via.placeholder.com/32x32" alt="Icono Notas" className="img-calculadora-icono" />
        <h3 className="calcu-nombre">App de Notas</h3>
        <div className="calcu-barra-espaciador" />
        <a href="#" className="enlace-proyecto-notas" title="Ver en GitHub">
          <SiGithub />
        </a>
      </div>
      <div className="contenido-proyecto-calculadora">
        <div className="calcu-info calcu-info-izquierda">
          <div className="calcu-descripcion calcu-descripcion-izquierda">
            <p>Aplicación para tomar notas con persistencia local.</p>
          </div>
        </div>
        <div className="calcu-imagen">
          <img src="https://via.placeholder.com/150x100" alt="App de Notas" className="img-calculadora-ui" />
        </div>
      </div>
    </div>
    {/* Tarjeta Desarrollando algo especial */}
    <div className="tarjeta-proyecto-especial tarjeta-proyecto-blur">
      <div className="contenido-proyecto-especial">
        <div className="especial-info">
          <p className="especial-descripcion">
            Desarrollando algo especial
          </p>
        </div>
      </div>
      <div className="especial-creativo">
        <span className="especial-emoji">💡</span>
        <div className="especial-barra-animada">
          <div className="especial-barra-progreso"></div>
        </div>
      </div>
    </div>
  </div>
);

const ContactoPanel = () => {
  const [showNotification, setShowNotification] = useState(false);

  // Animación de escritura para el título de contacto
  const titulos = useMemo(() => ['¡Creemos algo genial!'], []);
  const tituloAnimado = useTypewriter(titulos, 100, 50, 1500);

  const copyEmailToClipboard = () => {
    const email = "itsjry@gmail.com";
    navigator.clipboard.writeText(email)
      .then(() => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000); // Hide after 3 seconds
      })
      .catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
      });
  };

  return (
    <div className="contacto">
      <div className="contacto-imagen">
        <img src="src/assets/contactoimg.jpg" alt="" />
      </div>
      <div className="contacto-info">
        <h2 className="titulo-inicio-rgb">
          {tituloAnimado}
          <span className="cursor-typewriter">|</span>
        </h2>
        <p className="contacto-mensaje">
          ¿Tienes una idea, proyecto o simplemente quieres saludar?<br />
          <span className="contacto-destacado">Estoy listo para nuevos retos y colaboraciones.</span>
        </p>
        <div className="contacto-datos">
          <a href="https://github.com/InkSh4dow" className="contacto-bloque" title="GitHub" target="_blank" rel="noopener noreferrer">
            <FaGithub /> <span>InkSh4dow</span>
          </a>
          <a href="https://www.linkedin.com/in/joseph-rodriguez-701781364/" className="contacto-bloque" title="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedin /> <span>Joseph Rodriguez</span>
          </a>
          <button onClick={copyEmailToClipboard} className="contacto-bloque" title="Copiar correo">
            <FaPaperPlane /> <span>itsjry@gmail.com</span>
          </button>
        </div>
        <div className="contacto-footer">
          <span>Siempre abierto a nuevas ideas y aventuras tecnológicas </span>
        </div>
      </div>
      {showNotification && (
        <div className="notificacion-clipboard">
          Guardado en el portapapeles
        </div>
      )}
    </div>
  );
};

function FondoPaneles({ activo }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--bg-rotation', angulosSeccion[activo]);
  }, [activo]);
  return (
    <div className="contenedor-paneles">
      {Object.keys(nombresSeccion).map((seccionKey) => (
        <div
          key={seccionKey}
          className={`panel-fondo panel-fondo-${seccionKey} ${activo === seccionKey ? 'activo' : ''}`}
        />
      ))}
    </div>
  );
}

function AppContent({ activo, setActivo }) {
  const manejarClick = useCallback((seccion) => setActivo(seccion), [setActivo]);

  const paneles = useMemo(() => ({
    inicio: <InicioPanel setActivo={setActivo} />,
    acerca: <AcercaPanel />,
    proyectos: <ProyectosPanel />,
    contacto: <ContactoPanel />
  }), [setActivo]);

  return (
    <>
      <div className={`titulo-flotante ${bordesSeccion[activo]}`}>
        <h2>{nombresSeccion[activo]}</h2>
      </div>
      <div className="paneles-contenido-superior">
        {Object.keys(nombresSeccion).map((seccionKey) => (
          <div
            key={seccionKey}
            className={`panel-contenido panel-${seccionKey} ${activo === seccionKey ? 'activo' : ''}`}
          >
            <div className="contenido-panel-interno">
              {paneles[seccionKey]}
            </div>
          </div>
        ))}
      </div>
      <nav className="navegacion-inferior">
        <div className="navegacion-inferior-interna">
          {[
            { key: 'inicio', icon: <AiFillHome />, label: 'Inicio' },
            { key: 'acerca', icon: <FaUser />, label: 'Acerca de' },
            { key: 'proyectos', icon: <FaFolderOpen />, label: 'Proyectos' },
            { key: 'contacto', icon: <FaEnvelope />, label: 'Contacto' }
          ].map(({ key, icon, label }) => (
            <button
              key={key}
              className={`item-navegacion${activo === key ? ' activo' : ''}${key === 'acerca' ? ' item-acerca' : ''}`}
              onClick={() => manejarClick(key)}
            >
              <span className="icono-navegacion">{icon}</span>
              <span className="etiqueta-navegacion">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}

function App() {
  const [activo, setActivo] = useState('inicio');

  return (
    <>
      <FondoPaneles activo={activo} />
      <div className="dragon-container">
        <Dragon theme={activo} />
      </div>
      <AppContent activo={activo} setActivo={setActivo} />
    </>
  );
}

export default App