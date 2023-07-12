import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import Basket from '../components/Basket/Basket.jsx';

const singleItem = [
  {
    id: 1,
    toppings: [
      {
        id: 3,
        name: 'Topping #3',
        price: 3
      },
      {
        id: 2,
        name: 'Topping #2',
        price: 2
      }
    ],
    size: {
      id: 1,
      name: 'Small',
      rate: 1
    },
    type: {
      id: 3,
      name: 'Calzone',
      thumb: '/src/assets/images/Calzone.png',
      price: 11
    }
  }
];

describe('Basket Component', () => {
  it('renders Basket with empty items', () => {
    render(<Basket confirmedItems={[]} />);

    expect(screen.getByText('No items in your basket')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText(/Checkout/i).closest('button')).toBeDisabled();
    expect(screen.getByText(/Empty Basket/i).closest('button')).toBeDisabled();
  });

  it('render Basket with one item', () => {
    render(<Basket confirmedItems={singleItem} />);

    expect(screen.getByText('1 x Calzone pizza')).toBeInTheDocument();
    expect(
      screen.getByText('Small, Topping #3, Topping #2')
    ).toBeInTheDocument();
    expect(screen.getByText(/Checkout/i).closest('button')).toBeEnabled();
    expect(screen.getByText(/Empty Basket/i).closest('button')).toBeEnabled();
  });

  it('test empty basket clicked', async () => {
    const user = userEvent.setup();
    const setConfirmedItems = jest.fn();
    render(
      <Basket
        confirmedItems={singleItem}
        setConfirmedItems={setConfirmedItems}
      />
    );
    await user.click(screen.getByText(/Empty Basket/i).closest('button'));

    expect(setConfirmedItems).toHaveBeenCalledWith([]);
  });

  it('test remove item clicked', async () => {
    const user = userEvent.setup();
    const setConfirmedItems = jest.fn();
    const { container } = render(
      <Basket
        confirmedItems={singleItem}
        setConfirmedItems={setConfirmedItems}
      />
    );

    const removeBtn = container.querySelector('.close-btn');
    await user.click(removeBtn);

    expect(setConfirmedItems).toHaveBeenCalled();
  });
});
