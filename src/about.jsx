import { useState } from 'react'
import {
  FaCopy,
  FaDiscord,
  FaExternalLinkAlt,
  FaInstagram,
  FaTimes,
  FaWallet,
} from 'react-icons/fa'
import { HiMenuAlt3 } from 'react-icons/hi'
import { PROFILE_IMAGE } from './profile-data.js'

const INSTAGRAM_URL = 'https://www.instagram.com/lete.videl/'
const DISCORD_URL = 'https://discord.gg/hWSju8tS65'
const DONATION_ALIAS = 'Pagina.web.lete'

function BackgroundOrbs() {
  return <div className="x0" aria-hidden="true"><i /><i /><i /></div>
}

function SupportModal({ onClose }) {
  const [copied, setCopied] = useState(false)

  const copyAlias = async () => {
    try {
      await navigator.clipboard.writeText(DONATION_ALIAS)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="xj" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="xk">
        <button onClick={onClose} aria-label="Cerrar"><FaTimes /></button>
        <i><FaWallet /></i>
        <small>APOYAR</small>
        <h3>Apoyar a Lete</h3>
        <p>Podés usar este alias si querés apoyar <strong>Lilith&apos;s Echo</strong> o ayudarme a continuar creando nuevos proyectos. Cualquier aporte suma muchísimo. Gracias por apoyar lo que hago.</p>
        <div className="xl">
          <span>Alias · cuenta en dólares</span>
          <button onClick={copyAlias}><b>{DONATION_ALIAS}</b><FaCopy /></button>
          <small>{copied ? 'Alias copiado.' : 'Tocá el alias para copiarlo'}</small>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage({ onHome }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)

  const goHome = () => {
    setMenuOpen(false)
    onHome()
  }

  return (
    <div className="app">
      <BackgroundOrbs />

      <header className="x1">
        <button className="x2" onClick={goHome}>Loop <b>Lete</b></button>
        <button className="x3" onClick={() => setMenuOpen((value) => !value)} aria-label="Abrir menú">
          {menuOpen ? <FaTimes /> : <HiMenuAlt3 />}
        </button>
        <nav className={menuOpen ? 'x4 on' : 'x4'}>
          <button onClick={goHome}>Inicio</button>
          <button className="on" onClick={() => setMenuOpen(false)}>Yo</button>
        </nav>
      </header>

      <main className="xm">
        <section className="xn">
          <div className="xo">
            <div className="xp" />
            <img src={PROFILE_IMAGE} alt="Alexis Oscar Videla" />
            <span className="xq"><i /> Creando siempre</span>
            <div className="xr">
              <b>Lete</b>
              <small>Estudiante · Creador</small>
            </div>
          </div>

          <div className="xs">
            <span>SOBRE MÍ</span>
            <h1>YO</h1>
            <i />
            <h2>Alexis Oscar Videla</h2>
            <p>Hola, soy Alexis, de Junín, Argentina. Creo proyectos para la comunidad y me encanta la programación, aunque una de mis mayores pasiones es escribir historias.</p>
            <p>Actualmente estoy trabajando en <strong>Lilith&apos;s Echo</strong>, mi novela ligera. Mi objetivo es poder trabajar con personas que me ayuden a corregir y mejorar todo lo que escribí para finalmente publicarla. Y si algún día el proyecto crece lo suficiente, me encantaría llevarlo todavía más lejos y convertirlo en un manga.</p>

            <div className="xt">
              <a href={DISCORD_URL} target="_blank" rel="noreferrer"><FaDiscord /><span>Discord</span><FaExternalLinkAlt /></a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><FaInstagram /><span>Instagram</span><FaExternalLinkAlt /></a>
              <button onClick={() => setSupportOpen(true)}><FaWallet /><span>Apoyar</span></button>
            </div>
          </div>
        </section>
      </main>

      {supportOpen && <SupportModal onClose={() => setSupportOpen(false)} />}
      <footer>© 2026 Lete</footer>
    </div>
  )
}
