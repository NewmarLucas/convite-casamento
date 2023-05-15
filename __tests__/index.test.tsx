import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

jest.mock('next/router', () => require('next-router-mock'));

describe('Home', () => {
  it('renders correctly', () => {
    render(<Home />);

    expect(screen.getByTestId('container')).toBeInTheDocument();
  });
});
