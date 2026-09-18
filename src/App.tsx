import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { Hero } from './sections/Hero/Hero'
import { About } from './sections/About/About'
import { KungFu } from './sections/KungFu/KungFu'
import { Training } from './sections/Training/Training'
import { Teachers } from './sections/Teachers/Teachers'
import { GallerySection } from './sections/Gallery/Gallery'
import { Locations } from './sections/Locations/Locations'
import { Contact } from './sections/Contact/Contact'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <KungFu />
        <Training />
        <Teachers />
        <GallerySection />
        <Locations />
        <Contact />
      </main>
      <Footer />
    </>
  )
}