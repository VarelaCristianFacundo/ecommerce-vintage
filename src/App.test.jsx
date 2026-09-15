import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from './App'

// App suscribe a onAuthStateChanged al montar. Se stubea el modulo de Firebase
// para que el test no dependa de red ni de credenciales reales.
vi.mock('./store/firebase', () => ({ db: {}, auth: {} }))
vi.mock('firebase/auth', () => ({ onAuthStateChanged: () => () => {} }))

test('muestra el estado de carga mientras resuelve la sesion', () => {
  render(<App />)
  expect(screen.getByText(/loading/i)).toBeInTheDocument()
})
