import React from 'react';
import { Button } from 'react-bootstrap';

import './index.scss';

const Basket = ({ confirmedItems, setConfirmedItems }) => {
  const handleRemoveItem = item =>
    setConfirmedItems(prev => prev.filter(choosen => choosen.id !== item.id));

  const renderEmptyItem = () => <div>No items in your basket</div>;

  const calculateItemPrice = item => {
    const pizzaPrice = item.type.price * item.size.rate || 0;
    const toppingPrice =
      item?.toppings
        ?.map(topping => topping?.price)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0) ||
      0;

    return pizzaPrice + toppingPrice;
  };

  const totalPrice = confirmedItems
    .map(item => calculateItemPrice(item))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const renderItemsList = () =>
    confirmedItems.map(item => (
      <div className="row" key={item.id}>
        <div className="col-sm-9">
          <div className="d-flex align-items-center">
            <div
              onClick={() => handleRemoveItem(item)}
              className="close-btn mr-2"
              alt="remove-button"
            >
              <span>&times;</span>
            </div>
            <span>{`1 x ${item.type.name} pizza`}</span>
          </div>
          <div>{`${item.size.name}, ${item.toppings
            .map(t => t.name)
            .join(', ')}`}</div>
        </div>
        <div className="col-sm-3">
          <span>{`$${calculateItemPrice(item)?.toFixed(2) || '0.00'}`}</span>
        </div>
      </div>
    ));

  return (
    <>
      <div className="basket-container">
        <div className="items-list">
          {confirmedItems.length === 0 ? renderEmptyItem() : renderItemsList()}
        </div>
        <div className="divider mb-1 mt-1" />
        <div className="d-flex flex-column justify-content-between flex-grow-1">
          <div className="row">
            <div className="col-sm-9">Total:</div>
            <div className="col-sm-3">{`$${
              totalPrice?.toFixed(2) || '0.00'
            }`}</div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Button
                disabled={confirmedItems.length === 0}
                className="w-100"
                variant="success"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 p-2">
        <div className="col-sm-12">
          <Button
            disabled={confirmedItems.length === 0}
            className="w-100"
            variant="light"
            onClick={() => setConfirmedItems([])}
          >
            Empty Basket
          </Button>
        </div>
      </div>
    </>
  );
};

export default Basket;
