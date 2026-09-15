// Reemplazo local de firebase/auth, para que la demo sea navegable sin backend.
//
// ATENCION: esto no es un sistema de autenticacion. Corre entero en el
// navegador y tanto la sesion como los usuarios viven en localStorage, donde
// cualquiera puede leerlos o editarlos desde la consola. No pongas aca nada
// que importe, ni lo reutilices en un proyecto real.

const CLAVE_USUARIOS = 'ecommerce-vintage:users'
const CLAVE_SESION = 'ecommerce-vintage:session'

const suscriptores = new Set()

function leer(clave, porDefecto) {
  try {
    return JSON.parse(localStorage.getItem(clave) ?? JSON.stringify(porDefecto))
  } catch {
    return porDefecto
  }
}

function escribir(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor))
  } catch {
    // Storage bloqueado: la sesion no sobrevive al refresh, pero la navegacion
    // de la demo sigue funcionando.
  }
}

function avisar(usuario) {
  suscriptores.forEach((cb) => cb(usuario))
}

// Se guarda un hash con sal en vez de la contraseña en texto plano. No aporta
// seguridad real (el calculo es publico y del lado del cliente), pero evita
// dejar contraseñas legibles en el storage del navegador.
async function hashear(password, sal) {
  const datos = new TextEncoder().encode(`${sal}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', datos)
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
}

function nuevaSal() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) =>
    b.toString(16).padStart(2, '0')
  ).join('')
}

export function getCurrentUser() {
  return leer(CLAVE_SESION, null)
}

/**
 * Se notifica de forma asincrona para imitar a Firebase: el primer render
 * ocurre con la sesion todavia sin resolver, que es lo que muestra el
 * estado de carga.
 */
export function onAuthStateChanged(callback) {
  suscriptores.add(callback)
  queueMicrotask(() => callback(getCurrentUser()))
  return () => suscriptores.delete(callback)
}

export async function createUser(email, password) {
  const usuarios = leer(CLAVE_USUARIOS, {})
  const clave = email.trim().toLowerCase()

  if (usuarios[clave]) {
    throw new Error('Ya existe una cuenta con ese correo.')
  }
  if (!clave || !password) {
    throw new Error('Ingresá un correo y una contraseña.')
  }

  const sal = nuevaSal()
  usuarios[clave] = { email: clave, sal, hash: await hashear(password, sal) }
  escribir(CLAVE_USUARIOS, usuarios)

  const usuario = { email: clave }
  escribir(CLAVE_SESION, usuario)
  avisar(usuario)
  return usuario
}

export async function signIn(email, password) {
  const usuarios = leer(CLAVE_USUARIOS, {})
  const clave = email.trim().toLowerCase()
  const registrado = usuarios[clave]

  if (!registrado || (await hashear(password, registrado.sal)) !== registrado.hash) {
    throw new Error('Correo o contraseña incorrectos.')
  }

  const usuario = { email: clave }
  escribir(CLAVE_SESION, usuario)
  avisar(usuario)
  return usuario
}

export async function signOut() {
  try {
    localStorage.removeItem(CLAVE_SESION)
  } catch {
    // Ver el comentario de escribir().
  }
  avisar(null)
}
