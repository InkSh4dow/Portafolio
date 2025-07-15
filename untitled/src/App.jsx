import { useState, useEffect } from 'react'
import './App.css'
import Dragon from './Dragon'
import { AiFillHome } from 'react-icons/ai'
import { FaUser, FaFolderOpen, FaEnvelope } from 'react-icons/fa'
import { SiKotlin, SiCss3, SiJavascript, SiHtml5, SiAndroidstudio, SiGit, SiGithub, SiIntellijidea, SiWebstorm, SiAffinity } from 'react-icons/si'

const useTypewriter = (words, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, pauseTime]);

  return currentText;
};

const nombresSeccion = {
  inicio: 'Inicio',
  acerca: 'Acerca de mí',
  proyectos: 'Proyectos',
  contacto: 'Contacto'
}

const bordesSeccion = {
  inicio: 'borde-rojo',
  acerca: 'borde-azul',
  proyectos: 'borde-verde',
  contacto: 'borde-blanco'
};

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
  { nombre: 'Affinity Publisher', icono: <SiAffinity />, className: 'color-affinity' },
];

const InicioPanel = ({ setActivo }) => (
    <>
      <img src="https://via.placeholder.com/150" alt="Avatar" className="avatar" />
      <p>Desarrollador de Software y entusiasta de la tecnología.</p>
      <div className="botones-inicio">
        <button className="boton-primario" onClick={() => setActivo('proyectos')}>
          Ver mis proyectos
        </button>
        <button className="boton-primario">Descargar CV</button>
      </div>
    </>
);

const TecnologiaMarquee = ({ items, reverse = false }) => (
    <div className={`tecnologias-marquesina ${reverse ? 'marquesina-inversa' : ''}`}>
      <div className="marquesina-track">
        {[...items, ...items, ...items].map((tech, index) => (
            <div
                className={`item-tecnologia ${tech.className}`}
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
  const nombres = ['Joseph Rodriguez', 'Desarrollador Web y Mobile'];
  const textoAnimado = useTypewriter(nombres, 100, 50, 1500);

  return (
      <div className="contenedor-acerca">
        <div className="columna-texto">
          <h3 className="titulo-nombre texto-rgb">
            {textoAnimado}
            <span className="cursor-typewriter">|</span>
          </h3>
          <p className="parrafo-izquierda">Apasionado por Kotlin, Android y el desarrollo web, siempre busco aplicar las mejores prácticas para crear aplicaciones escalables, eficientes y bien estructuradas.</p>
          <p className="parrafo-derecha">Estoy en formación constante, aprendiendo nuevas herramientas, frameworks y tecnologías para crecer como desarrollador mobile.</p>
          <p className="parrafo-izquierda">Mi objetivo es construir apps útiles, intuitivas y visualmente atractivas, enfocadas en una buena experiencia de usuario.</p>
          <p className="parrafo-derecha">Me gusta trabajar con orden, código limpio y una mentalidad enfocada en resolver problemas de forma práctica y creativa.</p>
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
      <div className="tarjeta-proyecto">
        <img src="https://via.placeholder.com/150x100" alt="Calculadora" className="imagen-proyecto" />
        <div className="info-proyecto">
          <h3>Calculadora Kotlin</h3>
          <p>Una simple calculadora hecha en Kotlin.</p>
          <a href="#" className="enlace-proyecto" title="Ver en GitHub">
            <SiGithub />
          </a>
        </div>
      </div>
      <div className="tarjeta-proyecto">
        <img src="https://via.placeholder.com/150x100" alt="App de Notas" className="imagen-proyecto" />
        <div className="info-proyecto">
          <h3>App de Notas</h3>
          <p>Aplicación para tomar notas con persistencia local.</p>
          <a href="#" className="enlace-proyecto" title="Ver en GitHub">
            <SiGithub />
          </a>
        </div>
      </div>
    </div>
);

const ContactoPanel = () => (
    <>
      <p>Puedes encontrarme en mis redes sociales o enviarme un correo.</p>
      <div className="enlaces-contacto">
        <a href="#" className="enlace-proyecto">GitHub</a>
        <a href="#" className="enlace-proyecto">LinkedIn</a>
        <a href="#" className="enlace-proyecto">correo@ejemplo.com</a>
      </div>
    </>
);


function AppContent({ activo, setActivo }) {
  const manejarClick = (seccion) => {
    setActivo(seccion)
  }

  const paneles = {
    inicio: <InicioPanel setActivo={setActivo} />,
    acerca: <AcercaPanel />,
    proyectos: <ProyectosPanel />,
    contacto: <ContactoPanel />
  };

  return (
      <>
        <div className={`titulo-flotante ${bordesSeccion[activo]}`}>
          <h2>{nombresSeccion[activo]}</h2>
        </div>
        <div className="contenedor-paneles">
          {Object.keys(nombresSeccion).map((seccionKey) => (
              <div
                  key={seccionKey}
                  className={`panel-contenido panel-${seccionKey} ${
                      activo === seccionKey ? 'activo' : ''
                  }`}
              >
                <div className="contenido-panel-interno">
                  {paneles[seccionKey]}
                </div>
              </div>
          ))}
        </div>

        <nav className="navegacion-inferior">
          <div className="navegacion-inferior-interna">
            <button
                className={`item-navegacion ${activo === 'inicio' ? ' activo' : ''}`}
                onClick={() => manejarClick('inicio')}
            >
              <span className="icono-navegacion"><AiFillHome /></span>
              <span className="etiqueta-navegacion">Inicio</span>
            </button>
            <button
                className={`item-navegacion item-acerca ${activo === 'acerca' ? ' activo' : ''}`}
                onClick={() => manejarClick('acerca')}
            >
              <span className="icono-navegacion"><FaUser /></span>
              <span className="etiqueta-navegacion">Acerca</span>
            </button>
            <button
                className={`item-navegacion ${activo === 'proyectos' ? ' activo' : ''}`}
                onClick={() => manejarClick('proyectos')}
            >
              <span className="icono-navegacion"><FaFolderOpen /></span>
              <span className="etiqueta-navegacion">Proyectos</span>
            </button>
            <button
                className={`item-navegacion ${
                    activo === 'contacto' ? ' activo' : ''
                }`}
                onClick={() => manejarClick('contacto')}
            >
              <span className="icono-navegacion"><FaEnvelope /></span>
              <span className="etiqueta-navegacion">Contacto</span>
            </button>
          </div>
        </nav>
      </>
  )
}

function App() {
  const [activo, setActivo] = useState('proyectos');

  return (
    <>
      <Dragon theme={activo} />
      <AppContent activo={activo} setActivo={setActivo} />
    </>
  );
}

export default App
