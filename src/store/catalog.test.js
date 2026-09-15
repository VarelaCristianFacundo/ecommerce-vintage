import { beforeEach, expect, test } from 'vitest'
import items from '../data/items.json'
import { createOrder, fetchItems } from './catalog'

beforeEach(() => localStorage.clear())

test('el catalogo cubre las categorias que ofrece el menu', () => {
  const categorias = new Set(items.map((i) => i.category))
  expect([...categorias].sort()).toEqual(['invierno', 'otonio', 'primavera', 'verano'])
})

test('cada producto tiene los campos que consumen los componentes', () => {
  for (const item of items) {
    expect(Object.keys(item).sort()).toEqual(
      ['cartTexto', 'category', 'id', 'imagen', 'precio', 'stock', 'titulo'].sort()
    )
    expect(typeof item.precio).toBe('number')
    expect(typeof item.stock).toBe('number')
  }
})

test('los tres filtros de precio del menu devuelven resultados', async () => {
  for (const [min, max] of [[1, 3000], [3000, 5000], [5000, 50000]]) {
    const encontrados = await fetchItems(min, max)
    expect(encontrados.length).toBeGreaterThan(0)
    encontrados.forEach((i) => {
      expect(i.precio).toBeGreaterThan(min)
      expect(i.precio).toBeLessThan(max)
    })
  }
})

test('createOrder devuelve un codigo y persiste la orden', async () => {
  const id = await createOrder({ total: 1500, items: [] })
  expect(id).toMatch(/^[A-Za-z0-9]{20}$/)

  const guardadas = JSON.parse(localStorage.getItem('ecommerce-vintage:orders'))
  expect(guardadas).toHaveLength(1)
  expect(guardadas[0].id).toBe(id)
})
