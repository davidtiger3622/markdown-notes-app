import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../Header'
import { useThemeStore } from '../../store/themeStore'

describe('Header', () => {
  it('renders the app title', () => {
    render(<Header onMenuClick={() => {}} />)
    expect(screen.getByText('Markdown Notes')).toBeInTheDocument()
  })

  it('calls onMenuClick when the menu button is clicked', async () => {
    const user = userEvent.setup()
    const handleMenuClick = vi.fn()

    render(<Header onMenuClick={handleMenuClick} />)
    await user.click(screen.getByLabelText('Open menu'))

    expect(handleMenuClick).toHaveBeenCalledOnce()
  })

  it('toggles the theme when the theme button is clicked', async () => {
    const user = userEvent.setup()
    const initialTheme = useThemeStore.getState().theme

    render(<Header onMenuClick={() => {}} />)
    await user.click(screen.getByLabelText('Toggle theme'))

    expect(useThemeStore.getState().theme).not.toBe(initialTheme)
  })
})
