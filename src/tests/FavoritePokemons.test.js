import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

test('', () => {});
describe('3. Teste o componente <FavoritePokemons.js />', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
   se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const linkMoreDetails1 = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkMoreDetails1);

    const inputFavorite1 = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(inputFavorite1);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);

    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(buttonNext);

    const linkMoreDetails2 = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkMoreDetails2);

    const inputFavorite2 = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(inputFavorite2);

    const linkFavoritePokemon = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavoritePokemon);
    const listPokemon = screen.getAllByTestId('pokemon-name');
    expect(listPokemon).toHaveLength(2);

    const pikachu = screen.getByText(/pikachu/i);
    const charmander = screen.getByText(/charmander/i);
    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
  });
});
