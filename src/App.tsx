import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { APP_BASENAME } from './router/basePath'
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
import { ProtectedRoute } from './components/admin/AdminShell'

const Events = lazy(() =>
  import('./sections/Events/Events').then((m) => ({ default: m.Events })),
)
const Login = lazy(() =>
  import('./pages/admin/Login').then((m) => ({ default: m.Login })),
)
const Dashboard = lazy(() =>
  import('./pages/admin/Dashboard').then((m) => ({ default: m.Dashboard })),
)
const EventForm = lazy(() =>
  import('./pages/admin/EventForm').then((m) => ({ default: m.EventForm })),
)

function RouteFallback() {
  return <div className="route-fallback">Cargando…</div>
}

function Home() {
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
        <Events />
        <Locations />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={APP_BASENAME}>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events/new"
            element={
              <ProtectedRoute>
                <EventForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events/:id/edit"
            element={
              <ProtectedRoute>
                <EventForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}