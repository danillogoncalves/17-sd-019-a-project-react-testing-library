import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('1. Teste o componente <App.js />', () => {
  it(`Teste se o topo da aplicação contém um conjunto fixo de links de navegação,
   e seus caminhos na URL.`,
  () => {
    const { history } = renderWithRouter(<App />);
    const links = [
      { link: 'Home', url: '/' },
      { link: 'About', url: '/about' },
      { link: 'Favorite Pokémons', url: '/favorites' }];
    links.forEach(({ link, url }) => {
      const nav = screen.getByRole('link', { name: link });
      userEvent.click(nav);
      const { location: { pathname } } = history;
      expect(nav).toBeInTheDocument();
      expect(pathname).toBe(url);
    });
  });

  it('URL desconhecida abre o Not Found.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/agumom');
    console.log(history);

    const notFound = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(notFound).toBeInTheDocument();
    // const unknownURL
  });
});
