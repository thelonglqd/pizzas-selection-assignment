import React from 'react';
import Button from 'react-bootstrap/Button';

import './index.scss';

const PizzaCard = ({ type, toggleModal, setSelected }) => {
  const { name, price, thumb } = type;

  const handleChoose = () => {
    setSelected(prev => ({ ...prev, type }));
    toggleModal();
  };

  return (
    <div className="pizza-card">
      <div
        style={{
          borderRadius: '8px',
          backgroundImage: `url(${thumb})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '300px',
          height: '200px',
          maxWidth: '90%',
          maxHeight: '60%'
        }}
      />
      <div className="text-title mt-4">{`${name} - $${price}`}</div>
      <div className="w-100 choose-button mt-4">
        <Button
          onClick={handleChoose}
          className="w-100"
          variant="primary"
          size="lg"
        >
          Choose
        </Button>
      </div>
    </div>
  );
};

export default PizzaCard;
