import { beforeEach, describe, expect, test } from 'vitest'
import { createUser, getCurrentUser, onAuthStateChanged, signIn, signOut } from './auth'

beforeEach(() => localStorage.clear())

describe('auth local', () => {
  test('registrar deja la sesion iniciada', async () => {
    const usuario = await createUser('Ana@Example.com', 'secreta123')
    expect(usuario.email).toBe('ana@example.com')
    expect(getCurrentUser()).toEqual({ email: 'ana@example.com' })
  })

  test('no permite registrar dos veces el mismo correo', async () => {
    await createUser('ana@example.com', 'secreta123')
    await expect(createUser('ana@example.com', 'otra')).rejects.toThrow(/ya existe/i)
  })

  test('iniciar sesion funciona con la contraseña correcta', async () => {
    await createUser('ana@example.com', 'secreta123')
    await signOut()
    expect(getCurrentUser()).toBeNull()

    await signIn('ana@example.com', 'secreta123')
    expect(getCurrentUser()).toEqual({ email: 'ana@example.com' })
  })

  test('rechaza la contraseña incorrecta', async () => {
    await createUser('ana@example.com', 'secreta123')
    await expect(signIn('ana@example.com', 'equivocada')).rejects.toThrow(/incorrect/i)
  })

  test('no guarda la contraseña en texto plano', async () => {
    await createUser('ana@example.com', 'secreta123')
    expect(localStorage.getItem('ecommerce-vintage:users')).not.toContain('secreta123')
  })

  test('onAuthStateChanged avisa al suscribirse y al cerrar sesion', async () => {
    await createUser('ana@example.com', 'secreta123')

    const vistos = []
    const desuscribir = onAuthStateChanged((u) => vistos.push(u))

    await new Promise((r) => queueMicrotask(r))
    expect(vistos).toEqual([{ email: 'ana@example.com' }])

    await signOut()
    expect(vistos).toEqual([{ email: 'ana@example.com' }, null])

    desuscribir()
    await signIn('ana@example.com', 'secreta123')
    expect(vistos).toHaveLength(2)
  })
})
