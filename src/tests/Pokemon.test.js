import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('6. Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    // userEvent.click(linkMoreDetails);
    const name = screen.getByTestId('pokemon-name');
    expect(name.innerHTML).toBe('Pikachu');

    const type = screen.getByTestId('pokemon-type');
    expect(type.innerHTML).toBe('Electric');

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');

    const imagePokemon = screen.getByAltText('Pikachu sprite');
    expect(imagePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Teste o link More Details.', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    console.log(linkMoreDetails.href);
    expect(linkMoreDetails).toHaveAttribute('href', '/pokemons/25');

    userEvent.click(linkMoreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const inputFavorite = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(inputFavorite);
    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
