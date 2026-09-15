import items from '../data/items.json'

// Reemplaza las lecturas y escrituras que antes iban a Firestore.
//
// Las funciones devuelven promesas aunque resuelvan de inmediato: los
// componentes ya trataban el catalogo como una fuente remota (spinner de
// carga incluido) y de esta forma no hubo que reescribir ese manejo.

const CLAVE_ORDENES = 'ecommerce-vintage:orders'

// Identificador corto y legible, en la linea de los que generaba Firestore.
function nuevoId() {
  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const bytes = crypto.getRandomValues(new Uint8Array(20))
  return Array.from(bytes, (b) => alfabeto[b % alfabeto.length]).join('')
}

/**
 * Productos con precio estrictamente entre min y max, que es el mismo criterio
 * de la query original (where '>' min, where '<' max, limit 100).
 */
export function fetchItems(min, max) {
  const encontrados = items
    .filter((item) => item.precio > min && item.precio < max)
    .slice(0, 100)
  return Promise.resolve(encontrados)
}

/**
 * Guarda la orden en localStorage y devuelve su identificador, que es lo unico
 * que la pantalla de checkout necesita mostrar.
 */
export function createOrder(orden) {
  const id = nuevoId()
  try {
    const previas = JSON.parse(localStorage.getItem(CLAVE_ORDENES) ?? '[]')
    previas.push({ id, ...orden })
    localStorage.setItem(CLAVE_ORDENES, JSON.stringify(previas))
  } catch {
    // Si el navegador tiene el storage bloqueado la compra igual se completa:
    // el comprobante se muestra aunque la orden no quede persistida.
  }
  return Promise.resolve(id)
}
