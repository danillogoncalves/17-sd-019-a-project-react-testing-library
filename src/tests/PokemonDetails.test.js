import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  it('As informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/10');

    const title = screen.getByRole('heading', { name: 'Caterpie Details', level: 2 });
    expect(title).toBeInTheDocument();

    const linkMoreDetails = screen.queryByRole('link', { name: /more details/i });
    expect(linkMoreDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summary).toBeInTheDocument();

    const paragraph1 = screen.getByText(
      /for protection, it releases a horrible stench from/i,
    );
    const paragraph2 = screen.getByText(
      / the antennae on its head to drive away enemies\./i,
    );
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
  it(`Teste se existe na página uma seção com os mapas contendo
   as localizações do pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/10');
    const title = screen
      .getByRole('heading', { name: 'Game Locations of Caterpie', level: 2 });
    expect(title).toBeInTheDocument();

    const totalLocation = screen.getAllByAltText(/Caterpie location/i);
    const NUMBER_LOCATION = 4;
    expect(totalLocation).toHaveLength(NUMBER_LOCATION);

    const listLocation = [
      { url: 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png', name: 'Johto Route 30',
      },
      { url: 'https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png', name: 'Johto Route 31',
      },
      { url: 'https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png', name: 'Ilex Forest',
      },
      { url: 'https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png', name: 'Johto National Park',
      },
    ];
    listLocation.forEach((element, index) => {
      const name = screen.getByText(element.name);
      expect(name).toBeDefined();
      const images = screen.getAllByAltText(/Caterpie location/i);
      expect(images[index]).toHaveAttribute('src', element.url);
    });
  });
  it(
    'Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const { history } = renderWithRouter(<App />);
      const URL_SNORLAX = '/pokemons/143';
      history.push(URL_SNORLAX);
      const checkboxFavorite = screen.getByRole('checkbox');
      expect(checkboxFavorite).toBeInTheDocument();

      userEvent.click(checkboxFavorite);
      history.push('/favorites');
      expect(screen.getByText('Snorlax')).toBeInTheDocument();
      history.push(URL_SNORLAX);
      const checkboxFavorite2 = screen.getByRole('checkbox');
      userEvent.click(checkboxFavorite2);
      history.push('/favorites');
      expect(screen.queryByText('Snorlax')).not.toBeInTheDocument();

      history.push(URL_SNORLAX);
      const labelCheckbox = screen.getByLabelText('Pokémon favoritado?');
      expect(labelCheckbox).toBeDefined();
    },
  );
});
