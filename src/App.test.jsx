import { render, screen } from '@testing-library/react'
import App from './App'

// El catalogo y la sesion son locales (src/store/catalog.js y src/store/auth.js),
// asi que el test no necesita stubear ningun servicio externo.

test('muestra el estado de carga mientras resuelve la sesion', () => {
  render(<App />)
  expect(screen.getByText(/loading/i)).toBeInTheDocument()
})

test('sin sesion guardada ofrece iniciar sesion', async () => {
  localStorage.clear()
  render(<App />)
  expect(await screen.findByRole('heading', { name: /welcome back/i })).toBeInTheDocument()
})
