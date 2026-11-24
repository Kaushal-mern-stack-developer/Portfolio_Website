import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'
import Contact from './components/Contact'

const App = () => {
  const [projectsRefresh, setProjectsRefresh] = useState(0)

  return (
    <>
      <div>
        <Navbar onProjectsChanged={() => setProjectsRefresh((v) => v + 1)} />
        <Home />
        <About />
        <Projects refreshKey={projectsRefresh} />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App
