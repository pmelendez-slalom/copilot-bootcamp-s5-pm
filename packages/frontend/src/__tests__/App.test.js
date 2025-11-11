import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Mock fetch for tests
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

// Create a test query client for each test
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

test('renders TODO App heading', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('should display empty state message when no todos', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const emptyMessage = await screen.findByText(/no todos yet/i);
  expect(emptyMessage).toBeInTheDocument();
});

test('should calculate and display correct stats', async () => {
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
  ];

  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  });

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Should show 2 items left (incomplete)
  await screen.findByText(/2 items left/i);
  // Should show 1 completed
  const completedChip = await screen.findByText(/1 completed/i);
  expect(completedChip).toBeInTheDocument();
});

test('should call delete API when delete button is clicked', async () => {
  const mockTodos = [
    { id: 1, title: 'Todo to delete', completed: false },
  ];

  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  });

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todo to appear
  await screen.findByText('Todo to delete');

  // Clear previous fetch calls
  global.fetch.mockClear();

  // Mock the delete response
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ message: 'Deleted' }),
  });

  const deleteButtons = screen.getAllByLabelText(/delete/i);
  fireEvent.click(deleteButtons[0]);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/todos/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

test('should display error message when API fails', async () => {
  global.fetch.mockRejectedValueOnce(new Error('API Error'));

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const errorMessage = await screen.findByText(/error loading todos/i);
  expect(errorMessage).toBeInTheDocument();
});
