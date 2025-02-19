import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'
import { expect } from 'vitest'

/**
 *
 * TEST COVERAGE:
 * npm test -- --coverage
 */

test('renders content', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  // Get by text falla si no encuentra el texto y por tanto expect no es requerido
  render(<Note note={note}/>)

  //screen.debug()

  //const element = screen.getByText('Component testing is done with react-testing-library')
  const element = screen.getByText('Component testing is done with react-testing-library', { exact: false })
  //const element = await screen.findByText('Component testing is done with react-testing-library')

  //screen.debug(element)

  expect(element).toBeDefined()

  // const { container } = render(<Note note={note}/>)
  // const div = container.querySelector('.note')
  // expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})

test('does not render this', () => {
  const note = {
    content: 'This is a reminder',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.queryByText('do not want this thing to be rendered')
  expect(element).toBeNull()
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = vi.fn()

  render (
    <Note note={note} toggleImportance={mockHandler}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})