import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminShell } from '../../components/admin/AdminShell'
import { createEvent, getAllEvents, updateEvent } from '../../services/supabase/events'
import { fileToDataUrl, optimizeImage, validateImage } from '../../services/image'
import { supabaseConfigured } from '../../services/supabase/client'
import styles from './EventForm.module.css'

export function EventForm() {
  const { id } = useParams<{ id: string }>()
  const editing = Boolean(id)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [published, setPublished] = useState(true)
  const [existingImage, setExistingImage] = useState<string | null>(null)
  const [selected, setSelected] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(Boolean(id))
  const fileRef = useRef<HTMLInputElement>(null)
  const revokeRef = useRef<string | null>(null)

  useEffect(() => {
    document.title = editing ? 'Editar evento · Administración' : 'Nuevo evento · Administración'
  }, [editing])

  useEffect(() => {
    if (!editing || !id) return
    let mounted = true
    getAllEvents()
      .then((items) => {
        if (!mounted) return
        const found = items.find((i) => i.id === id)
        if (!found) {
          navigate('/admin', { replace: true })
          return
        }
        setTitle(found.title)
        setDescription(found.description)
        setPublished(found.published)
        setExistingImage(found.image_url)
      })
      .catch(() => {
        if (mounted) setSubmitError('No se pudo cargar el evento. Intentá nuevamente.')
      })
      .finally(() => {
        if (mounted) setLoadingEdit(false)
      })
    return () => {
      mounted = false
    }
  }, [editing, id, navigate])

  useEffect(() => {
    return () => {
      if (revokeRef.current) URL.revokeObjectURL(revokeRef.current)
    }
  }, [])

  function handleImageChange(file: File | undefined) {
    setFileError(null)
    setSubmitError(null)
    if (!file) {
      setSelected(null)
      setPreview(null)
      return
    }
    const validation = validateImage(file)
    if (!validation.ok) {
      setFileError(validation.message ?? 'Archivo no válido.')
      setSelected(null)
      setPreview(null)
      return
    }
    setSelected(file)
    fileToDataUrl(file).then((dataUrl) => {
      if (revokeRef.current) URL.revokeObjectURL(revokeRef.current)
      revokeRef.current = null
      setPreview(dataUrl)
    })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitError(null)
    setFileError(null)

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()
    if (!trimmedTitle || !trimmedDescription) {
      setSubmitError('Completá el título y la descripción del evento.')
      return
    }

    setBusy(true)
    try {
      let optimized: Blob | null = null
      if (selected) {
        optimized = await optimizeImage(selected)
      }
      const draft = {
        title: trimmedTitle,
        description: trimmedDescription,
        image: optimized ? (optimized as File) : selected,
        published,
      }

      if (editing && id) {
        await updateEvent(id, draft, existingImage)
      } else {
        await createEvent(draft)
      }
      navigate('/admin', { replace: true })
    } catch {
      setSubmitError(
        editing
          ? 'No se pudo guardar el evento. Intentá nuevamente.'
          : 'No se pudo guardar el evento. Intentá nuevamente.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <AdminShell title={editing ? 'Editar evento' : 'Nuevo evento'}>
      {!supabaseConfigured && (
        <p className={styles.error} role="alert">
          El panel aún no está configurado. Completá las variables de entorno de Supabase.
        </p>
      )}

      {loadingEdit ? (
        <p className={styles.state}>Cargando evento…</p>
      ) : (
        <form className={styles.card} onSubmit={handleSubmit} noValidate>
          <label className={styles.field}>
            <span className={styles.label}>Título</span>
            <input
              type="text"
              required
              maxLength={140}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              disabled={busy}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Descripción</span>
            <textarea
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              disabled={busy}
            />
          </label>

          <div className={styles.field}>
            <span className={styles.label}>Imagen</span>
            <button
              type="button"
              className={styles.fileBtn}
              onClick={() => fileRef.current?.click()}
              disabled={busy}
            >
              {selected ? 'Cambiar imagen' : 'Seleccionar imagen'}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className={styles.fileInput}
              onChange={(e) => handleImageChange(e.target.files?.[0])}
            />

            {fileError && (
              <p className={styles.fileError} role="alert">
                {fileError}
              </p>
            )}

            {preview ? (
              <img src={preview} alt="Vista previa de la imagen del evento" className={styles.preview} />
            ) : existingImage ? (
              <img src={existingImage} alt="Imagen actual del evento" className={styles.preview} />
            ) : (
              <p className={styles.hint}>No hay imagen seleccionada. El evento se mostrará sin imagen.</p>
            )}
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Estado</span>
            <select
              value={published ? 'published' : 'draft'}
              onChange={(e) => setPublished(e.target.value === 'published')}
              className={styles.select}
              disabled={busy}
            >
              <option value="published">Publicado</option>
              <option value="draft">Borrador</option>
            </select>
            <p className={styles.hint}>
              Solo los eventos publicados son visibles en el sitio.
            </p>
          </div>

          {submitError && (
            <p className={styles.error} role="alert">
              {submitError}
            </p>
          )}

          <div className={styles.actions}>
            <Link to="/admin" className={styles.cancel}>
              Cancelar
            </Link>
            <button type="submit" className={styles.submit} disabled={busy}>
              {busy
                ? selected
                  ? 'Subiendo imagen y guardando…'
                  : 'Guardando evento…'
                : editing
                  ? 'Guardar cambios'
                  : 'Guardar evento'}
            </button>
          </div>
        </form>
      )}
    </AdminShell>
  )
}