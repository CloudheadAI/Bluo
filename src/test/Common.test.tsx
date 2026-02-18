import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingSpinner, EmptyState, ErrorMessage, Button, Avatar } from '../components/common';

describe('Common Components', () => {
  it('renders LoadingSpinner with accessible role', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders EmptyState with content', () => {
    render(<EmptyState icon="📝" title="No posts" description="Nothing here" />);
    expect(screen.getByText('No posts')).toBeInTheDocument();
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('renders ErrorMessage with alert role', () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders Button with different variants', () => {
    const { rerender } = render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();

    rerender(<Button isLoading>Click me</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders Avatar with initial', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });
});
