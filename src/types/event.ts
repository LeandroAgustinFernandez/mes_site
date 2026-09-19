export interface EventItem {
  id: string
  title: string
  description: string
  image_url: string | null
  created_at: string
  published: boolean
}

export interface EventDraft {
  title: string
  description: string
  image?: File | null
  published: boolean
}