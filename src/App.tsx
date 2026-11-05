import Nav from './components/Nav'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import About from './components/About'
import Systems from './components/Systems'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="site">
      <Nav />
      <main id="top">
        <Hero />
        <Highlights />
        <About />
        <Systems />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
