import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartContextProvider } from '../../store/cart-context'
import items from '../../data/items.json'
import Login from './Login'

// Login monta <Route path='/*'> y, mas abajo, UserGreeting anida otro <Routes>
// con paths relativos (item/:id, category/:id). Esa combinacion splat + rutas
// relativas es la que cambia de comportamiento entre react-router 6 y 7, asi
// que conviene tenerla cubierta de punta a punta.
const montar = (ruta) =>
  render(
    <CartContextProvider>
      <MemoryRouter initialEntries={[ruta]}>
        <Login user="ana@example.com" setAuthState={() => {}} setUser={() => {}} />
      </MemoryRouter>
    </CartContextProvider>
  )

test('la raiz lista el catalogo completo', async () => {
  montar('/')
  expect(await screen.findByText(items[0].titulo)).toBeInTheDocument()
  items.forEach((i) => expect(screen.getByText(i.titulo)).toBeInTheDocument())
})

test('una categoria filtra dentro de la ruta splat', async () => {
  const verano = items.filter((i) => i.category === 'verano')
  montar('/category/verano')

  expect(await screen.findByText(verano[0].titulo)).toBeInTheDocument()
  verano.forEach((i) => expect(screen.getByText(i.titulo)).toBeInTheDocument())
  items
    .filter((i) => i.category !== 'verano')
    .forEach((i) => expect(screen.queryByText(i.titulo)).not.toBeInTheDocument())
})

test('el detalle de un producto resuelve dentro de la ruta splat', async () => {
  const elegido = items[0]
  montar(`/item/${elegido.id}`)

  expect(await screen.findByText(elegido.cartTexto)).toBeInTheDocument()
  expect(screen.getByText(`Stock: ${elegido.stock}`)).toBeInTheDocument()
})

test('las rutas hermanas del splat siguen teniendo prioridad', async () => {
  montar('/checkout')
  expect(await screen.findByText(/para finalizar tu compra/i)).toBeInTheDocument()
})

// En produccion el router arranca con basename=import.meta.env.BASE_URL, que
// para GitHub Pages es '/ecommerce-vintage/' (con barra final). Se cubre aparte
// porque el resto de los tests monta MemoryRouter sin basename.
test('el basename de GitHub Pages no rompe el ruteo', async () => {
  const verano = items.filter((i) => i.category === 'verano')

  render(
    <CartContextProvider>
      <MemoryRouter
        basename="/ecommerce-vintage/"
        initialEntries={['/ecommerce-vintage/category/verano']}
      >
        <Login user="ana@example.com" setAuthState={() => {}} setUser={() => {}} />
      </MemoryRouter>
    </CartContextProvider>
  )

  expect(await screen.findByText(verano[0].titulo)).toBeInTheDocument()
  items
    .filter((i) => i.category !== 'verano')
    .forEach((i) => expect(screen.queryByText(i.titulo)).not.toBeInTheDocument())
})
