import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import SelectionModal from '../components/SelectionModal/index.jsx';

describe('Selection modal Component', () => {
  it('renders PizzaCard with type and price', () => {
    render(<SelectionModal show />);

    expect(screen.getByText('Topping #1')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText(/Add to basket/i).closest('button')).toBeEnabled();
    expect(screen.getByText(/Cancel/i).closest('button')).toBeEnabled();
  });

  it('cancel modal', async () => {
    const user = userEvent.setup();
    const setSelected = jest.fn();
    const toggleModal = jest.fn();
    render(
      <SelectionModal
        show
        setSelected={setSelected}
        toggleModal={toggleModal}
      />
    );
    await user.click(screen.getByText(/Cancel/i).closest('button'));

    expect(setSelected).toHaveBeenCalled();
    expect(toggleModal).toHaveBeenCalled();
  });

  it('add to basket clicked', async () => {
    const user = userEvent.setup();
    const setSelected = jest.fn();
    const toggleModal = jest.fn();
    const setConfirmedItems = jest.fn();
    render(
      <SelectionModal
        show
        setSelected={setSelected}
        toggleModal={toggleModal}
        setConfirmedItems={setConfirmedItems}
      />
    );
    await user.click(screen.getByText(/Add to basket/i).closest('button'));

    expect(setSelected).toHaveBeenCalled();
    expect(toggleModal).toHaveBeenCalled();
    expect(setConfirmedItems).toHaveBeenCalled();
  });

  it('handle topping selected', async () => {
    const user = userEvent.setup();
    const setSelected = jest.fn();
    const toggleModal = jest.fn();
    const setConfirmedItems = jest.fn();
    render(
      <SelectionModal
        show
        setSelected={setSelected}
        toggleModal={toggleModal}
        setConfirmedItems={setConfirmedItems}
      />
    );

    const topping1 = screen.getByTestId('checkbox-1');
    await user.click(topping1);

    expect(setSelected).toHaveBeenCalled();
  });

  it('handle pizza selected', async () => {
    const user = userEvent.setup();
    const setSelected = jest.fn();
    const toggleModal = jest.fn();
    const setConfirmedItems = jest.fn();
    render(
      <SelectionModal
        show
        setSelected={setSelected}
        toggleModal={toggleModal}
        setConfirmedItems={setConfirmedItems}
      />
    );

    const pizzaSmall = screen.getByTestId('pizza-1');
    await user.click(pizzaSmall);

    expect(setSelected).toHaveBeenCalled();
  });
});
