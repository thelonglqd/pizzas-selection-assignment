import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import PizzaCard from '../components/PizzaCard/index.jsx';

describe('PizzaCard Component', () => {
  it('renders PizzaCard with type and price', () => {
    render(<PizzaCard type={{ id: 1, name: 'Sicilian', price: 10 }} />);

    expect(screen.getByText('Sicilian - $10')).toBeInTheDocument();
    expect(screen.getByText(/Choose/i).closest('button')).toBeEnabled();
  });

  it('test choose button clicked', async () => {
    const user = userEvent.setup();
    const setSelected = jest.fn();
    const toggleModal = jest.fn();
    render(
      <PizzaCard
        type={{ id: 1, name: 'Sicilian', price: 10 }}
        setSelected={setSelected}
        toggleModal={toggleModal}
      />
    );
    await user.click(screen.getByText(/Choose/i).closest('button'));

    expect(setSelected).toHaveBeenCalled();
    expect(toggleModal).toHaveBeenCalled();
  });
});
