import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { TermsPage } from '../pages/TermsPage';
import { PrivacyPage } from '../pages/PrivacyPage';

describe('Legal Pages', () => {
  it('renders Terms of Service page with key sections', () => {
    render(
      <MemoryRouter>
        <TermsPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('1. Acceptance of Terms')).toBeInTheDocument();
    expect(screen.getByText('4. Subscriptions and Payments')).toBeInTheDocument();
    expect(screen.getByText('6. AI Features')).toBeInTheDocument();
  });

  it('renders Privacy Policy page with key sections', () => {
    render(
      <MemoryRouter>
        <PrivacyPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('1. Information We Collect')).toBeInTheDocument();
    expect(screen.getByText('3. Payment Information')).toBeInTheDocument();
    expect(screen.getByText('5. AI and Content Analysis')).toBeInTheDocument();
  });
});
