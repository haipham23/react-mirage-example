import { render, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import setupServer from '../setupServer';

let server;

beforeEach(() => {
  server = setupServer();
});

afterEach(() => {
  server.shutdown();
});

test('renders Registration form', () => {
  const { getByTestId } = render(<Register />);

  expect(getByTestId('register-start')).toBeInTheDocument();
});

test('submits form', async () => {
  const { queryByTestId, getByTestId } = render(<Register />);

  fireEvent.change(getByTestId('username-form'), { target: { value: 'test-user' } });
  fireEvent.change(getByTestId('password-form'), { target: { value: '123456' } });
  fireEvent.click(getByTestId('save-button'));

  await waitFor(() => {
    expect(queryByTestId('register-start')).not.toBeInTheDocument()
    expect(getByTestId('register-done')).toBeInTheDocument();
  });
});
