import { supabase } from './client'

export async function getSessionUser() {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session?.user ?? null
}

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error('Supabase no está configurado.')
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

export async function signOut() {
  if (!supabase) return
  await supabase.auth.signOut()
}

export function onAuthStateChange(callback: (signedIn: boolean) => void) {
  if (!supabase) {
    callback(false)
    return () => {}
  }
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(Boolean(session))
  })
  return () => data.subscription.unsubscribe()
}