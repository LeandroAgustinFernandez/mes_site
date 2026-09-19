import { supabase, supabaseConfigured } from './client'
import type { EventItem, EventDraft } from '../../types/event'

const BUCKET = 'event-images'

function requireClient(supabaseNotNull: typeof supabase) {
  if (!supabaseNotNull) throw new Error('Supabase no está configurado.')
  return supabaseNotNull
}

export async function getPublishedEvents(): Promise<EventItem[]> {
  if (!supabaseConfigured || !supabase) return []
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as EventItem[]
}

export async function getAllEvents(): Promise<EventItem[]> {
  if (!supabaseConfigured || !supabase) return []
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as EventItem[]
}

export async function createEvent(draft: EventDraft): Promise<EventItem> {
  const client = requireClient(supabase)
  const image_url = draft.image ? await uploadEventImage(draft.image) : null
  const { data, error } = await client
    .from('events')
    .insert({
      title: draft.title,
      description: draft.description,
      image_url,
      published: draft.published,
    })
    .select()
    .single()
  if (error) throw error
  return data as EventItem
}

export async function updateEvent(
  id: string,
  draft: EventDraft,
  previousImageUrl: string | null,
): Promise<EventItem> {
  const client = requireClient(supabase)
  let image_url = previousImageUrl
  if (draft.image) {
    const oldPath = imageUrlToStoragePath(previousImageUrl)
    image_url = await uploadEventImage(draft.image)
    if (oldPath) await deleteEventImageByPath(oldPath)
  }
  const { data, error } = await client
    .from('events')
    .update({
      title: draft.title,
      description: draft.description,
      image_url,
      published: draft.published,
    })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as EventItem
}

export async function deleteEvent(event: EventItem): Promise<void> {
  const client = requireClient(supabase)
  const path = imageUrlToStoragePath(event.image_url)
  if (path) await deleteEventImageByPath(path)
  const { error } = await client.from('events').delete().eq('id', event.id)
  if (error) throw error
}

async function uploadEventImage(file: File | Blob): Promise<string> {
  const client = requireClient(supabase)
  const ext = file instanceof File ? (file.name.split('.').pop() ?? 'webp') : 'webp'
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await client.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
  })
  if (error) throw error
  const { data } = client.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

async function deleteEventImageByPath(path: string): Promise<void> {
  const client = requireClient(supabase)
  const { error } = await client.storage.from(BUCKET).remove([path])
  if (error) throw error
}

function imageUrlToStoragePath(url: string | null): string | null {
  if (!url) return null
  const marker = `/object/public/${BUCKET}/`
  const index = url.indexOf(marker)
  if (index === -1) return null
  return url.slice(index + marker.length)
}