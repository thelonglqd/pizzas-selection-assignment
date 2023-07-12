import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const TOPPINGS = [
  { id: 1, name: 'Topping #1', price: 1 },
  { id: 2, name: 'Topping #2', price: 2 },
  { id: 3, name: 'Topping #3', price: 3 },
  { id: 4, name: 'Topping #4', price: 4 },
  { id: 5, name: 'Topping #5', price: 5 },
  { id: 6, name: 'Topping #6', price: 6 },
  { id: 7, name: 'Topping #7', price: 7 },
  { id: 8, name: 'Topping #8', price: 8 },
  { id: 9, name: 'Topping #9', price: 9 }
];

const SIZES = [
  { id: 1, name: 'Small', rate: 1 },
  { id: 2, name: 'Medium', rate: 1.25 },
  { id: 3, name: 'Large', rate: 1.75 }
];

const INITIAL_SELECTED_STATE = { id: 0, toppings: [], size: {}, type: {} };

const SelectionModal = ({
  show,
  setSelected,
  selected,
  setConfirmedItems,
  toggleModal
}) => {
  const handleToppingSelect = (e, topping) =>
    e.target.checked
      ? setSelected(prev => ({
          ...prev,
          toppings: [...prev.toppings, topping]
        }))
      : setSelected(prev => ({
          ...prev,
          toppings: prev.toppings.filter(t => t.id !== topping.id)
        }));

  const handleCancelSelect = () => {
    toggleModal();
    setSelected(prev => ({ ...INITIAL_SELECTED_STATE, id: prev.id + 1 }));
  };

  const handlePizzaSizeSelect = e =>
    setSelected(prev => ({
      ...prev,
      id: prev.id + 1,
      size: SIZES.find(size => size.id === parseInt(e.target.value, 10))
    }));

  const handleAddToBasket = () => {
    toggleModal();
    setConfirmedItems(prev => [...prev, selected]);
    setSelected(prev => ({ ...INITIAL_SELECTED_STATE, id: prev.id + 1 }));
  };

  return (
    <Modal show={show} centered size="lg">
      <Modal.Body>
        <div className="toppings-container">
          {TOPPINGS.map(topping => (
            <div className="form-check items" key={topping.id}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={topping.id}
                data-testid={`checkbox-${topping.id}`}
                onChange={e => handleToppingSelect(e, topping)}
              />
              <label className="form-check-label" htmlFor={topping.id}>
                {topping.name}
              </label>
            </div>
          ))}
        </div>
        <div className="sizes-container">
          {SIZES.map(size => (
            <div className="form-check" key={size.id}>
              <input
                className="form-check-input"
                type="radio"
                id={`${size.name}-${size.id}`}
                name="sizes-radio"
                onChange={handlePizzaSizeSelect}
                value={size.id}
                data-testid={`pizza-${size.id}`}
              />
              <label
                className="form-check-label"
                htmlFor={`${size.name}-${size.id}`}
              >
                {size.name}
              </label>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="w-100 d-flex justify-content-between">
          <Button variant="primary" onClick={handleAddToBasket}>
            Add to basket
          </Button>
          <Button variant="light" onClick={handleCancelSelect}>
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectionModal;
