import React, { useState } from 'react'
import Navbar from './Components/Layout/Navbar'
import Hero from './Components/Sections/Hero'
import About from './Components/Sections/About'
import Skills from './Components/Sections/Skills'
import Projects from './Components/Sections/Projects'
import Services from './Components/Sections/Services'
import Contact from './Components/Sections/Contact'
import Footer from './Components/Layout/Footer'
import Loader from './Components/Loader/Loader'
import useLoader from './Hooks/useLoader'
import ProtectedAdmin from './Components/Admin/ProtectedAdmin'

const App = () => {
  const isLoading = useLoader();
  const [showAdmin, setShowAdmin] = useState(false);

  // Check if URL contains admin
  React.useEffect(() => {
    if (window.location.pathname === '/admin') {
      setShowAdmin(true);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (showAdmin) {
    return <ProtectedAdmin />;
  }

  return (
    <div className='min-h-screen bg-black'>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App