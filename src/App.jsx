import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Intro from './components/Intro'
import Expertise from './components/Expertise'
import About from './components/About'
import GetToKnow from './components/GetToKnow'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Intro />
        <Expertise />
        <About />
        <GetToKnow />
        <Experience />
        {/*
          BY THE NUMBERS - REMOVED. The 40% / 25% / 15% / 20+ counter band sat here.
          src/components/Numbers.jsx is still in the repo. To restore: uncomment the
          `numbers` block in src/data/content.js, re-add the import above, and put
          <Numbers /> back on the next line. See INTERVIEW-NOTES.md first.
        */}
        <Skills />
        <Certifications />
        <Contact />
      </main>
    </>
  )
}
