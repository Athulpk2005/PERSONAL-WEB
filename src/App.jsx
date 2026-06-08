import React, { useState, useEffect, Suspense, lazy } from 'react'
import Navbar from './Components/Layout/Navbar'
import Hero from './Components/Sections/Hero'
import Footer from './Components/Layout/Footer'
import Loader from './Components/Loader/Loader'
import useLoader from './Hooks/useLoader'
import { SmoothScrollProvider } from './Components/SmoothScroll'

// Lazy load non-critical components
const About = lazy(() => import('./Components/Sections/About'));
const Skills = lazy(() => import('./Components/Sections/Skills'));
const Projects = lazy(() => import('./Components/Sections/Projects'));
const Services = lazy(() => import('./Components/Sections/Services'));
const Contact = lazy(() => import('./Components/Sections/Contact'));
const ProtectedAdmin = lazy(() => import('./Components/Admin/ProtectedAdmin'));

const AppContent = () => (
  <>
    <Hero />
    <Suspense fallback={<div className="h-20" />}>
      <About />
    </Suspense>
    <Suspense fallback={<div className="h-20" />}>
      <Skills />
    </Suspense>
    <Suspense fallback={<div className="h-20" />}>
      <Projects />
    </Suspense>
    <Suspense fallback={<div className="h-20" />}>
      <Services />
    </Suspense>
    <Suspense fallback={<div className="h-20" />}>
      <Contact />
    </Suspense>
  </>
);

const App = () => {
  const isLoading = useLoader();
  const [showAdmin, setShowAdmin] = useState(false);

  // Check if URL contains admin (handles refresh and direct navigation)
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin' || path.startsWith('/admin/') || path === '/admin.html') {
      setShowAdmin(true);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='min-h-screen bg-black'>
      {showAdmin ? (
        <Suspense fallback={<Loader />}>
          <ProtectedAdmin />
        </Suspense>
      ) : (
        <SmoothScrollProvider lenisOptions={{ lerp: 0.1, infinite: false }}>
          <>
            <Navbar />
            <main id="main-content" role="main">
              <AppContent />
            </main>
            <Footer />
          </>
        </SmoothScrollProvider>
      )}
    </div>
  )
}

export default App
