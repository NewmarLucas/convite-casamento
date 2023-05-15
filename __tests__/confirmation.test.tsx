import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Confirmation from '../src/pages/confirmar/index';

describe('Confirmation page', () => {
  it('renders correctly', () => {
    render(<Confirmation />);

    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByTestId('leftContent')).toBeInTheDocument();
    expect(screen.getByTestId('rightContent')).toBeInTheDocument();
    expect(screen.getByTestId('bannerTitle')).toBeInTheDocument();
    expect(screen.getByTestId('flowersImage')).toBeInTheDocument();
    expect(screen.getByTestId('inviteText')).toBeInTheDocument();
    expect(screen.getByTestId('peopleForm')).toBeInTheDocument();
    expect(screen.getByTestId('confirmationButton')).toBeInTheDocument();
  });
});
