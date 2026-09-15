import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartContextProvider } from '../../store/cart-context'
import items from '../../data/items.json'
import UserGreeting from './UserGreeting'

const montar = (ruta = '/') =>
  render(
    <CartContextProvider>
      <MemoryRouter initialEntries={[ruta]}>
        <UserGreeting />
      </MemoryRouter>
    </CartContextProvider>
  )

test('lista el catalogo completo en la ruta raiz', async () => {
  montar()
  // El primer producto aparece recien cuando el catalogo termina de cargar.
  expect(await screen.findByText(items[0].titulo)).toBeInTheDocument()

  const visibles = items.filter((i) => i.precio > 1 && i.precio < 200000)
  visibles.forEach((i) => expect(screen.getByText(i.titulo)).toBeInTheDocument())
})

test('filtra por categoria segun la ruta', async () => {
  montar('/category/verano')
  await screen.findByText(items.find((i) => i.category === 'verano').titulo)

  const deVerano = items.filter((i) => i.category === 'verano')
  const deInvierno = items.filter((i) => i.category === 'invierno')

  deVerano.forEach((i) => expect(screen.getByText(i.titulo)).toBeInTheDocument())
  deInvierno.forEach((i) => expect(screen.queryByText(i.titulo)).not.toBeInTheDocument())
})

test('cada tarjeta muestra la imagen del producto', async () => {
  montar()
  await screen.findByText(items[0].titulo)

  const imagenes = screen.getAllByRole('img')
  items.forEach((i) => {
    expect(imagenes.some((img) => img.getAttribute('src') === i.imagen)).toBe(true)
  })
})
