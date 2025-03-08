import React from 'react';
import { render, screen } from '@testing-library/react';
import { LeaderboardPage } from '../LeaderboardPage';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('LeaderboardPage', () => {
  it('renders leaderboard page heading', () => {
    render(
      <Provider store={store}>
        <LeaderboardPage />
      </Provider>
    );
    expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
  });
});
