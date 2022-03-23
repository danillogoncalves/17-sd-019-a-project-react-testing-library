import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('5. Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });
  it(`Teste se é exibido o próximo Pokémon da lista quando
   o botão Próximo pokémon é clicado, e Teste se é mostrado
    apenas um Pokémon por vez.`, () => {
    renderWithRouter(<App />);
    const buttonAll1 = screen.getByRole('button', { name: /all/i });
    expect(buttonAll1).toBeInTheDocument();
    const listPokemon = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];
    listPokemon.forEach((pokemon) => {
      const name = screen.getByText(pokemon);
      const testId = screen.getAllByTestId(/pokemon-name/i);
      expect(testId).toHaveLength(1);
      expect(name).toBeInTheDocument();
      const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(buttonNext);
    });
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const listTypePokemon = [
      'All',
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    listTypePokemon.forEach((type) => {
      const buttonType = screen.getAllByRole('button', { name: type });
      expect(buttonType).toHaveLength(1);
    });
    const NUMBER_TYPE_BUTTON = 7;
    const testId = screen.getAllByTestId('pokemon-type-button');
    expect(testId).toHaveLength(NUMBER_TYPE_BUTTON);
    const listTypeFire = [
      'Charmander',
      'Rapidash',
    ];
    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(buttonFire);
    listTypeFire.forEach((pokemon) => {
      const name = screen.getByText(pokemon);
      expect(name).toBeInTheDocument();
      const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(buttonNext);
    });
    const buttonAll2 = screen.getByRole('button', { name: /all/i });
    expect(buttonAll2).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonPsychic = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(buttonPsychic);
    const buttonAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(buttonAll);
    const COUNT = 8;
    for (let index = 0; index <= COUNT; index += 1) {
      const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(buttonNext);
    }
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
