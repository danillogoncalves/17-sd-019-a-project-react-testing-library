import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('4. Teste o componente <NotFound.js />', () => {
  it('', () => {
    renderWithRouter(<NotFound />);
    const text = screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 });
    expect(text).toBeInTheDocument();

    const image = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
