import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';

import CalzonePizza from './assets/images/Calzone.png';
import HawaiianPizza from './assets/images/Hawaiian.jpg';
import MargheritaPizza from './assets/images/Margherita.jpg';
import NeapolitanPizza from './assets/images/Neapolitan.jpg';
import PepperoniPizza from './assets/images/Pepperoni.jpg';
import SicilianPizza from './assets/images/Sicilian.jpg';
import Basket from './components/Basket/Basket';
import PizzaCard from './components/PizzaCard';
import SelectionModal from './components/SelectionModal';
import './index.scss';

const PIZZAS_TYPE = [
  { id: 1, name: 'Sicilian', thumb: SicilianPizza, price: 10 },
  { id: 2, name: 'Margherita', thumb: MargheritaPizza, price: 15 },
  { id: 3, name: 'Calzone', thumb: CalzonePizza, price: 11 },
  { id: 4, name: 'Pepperoni', thumb: PepperoniPizza, price: 8 },
  { id: 5, name: 'Hawaiian', thumb: HawaiianPizza, price: 7 },
  { id: 6, name: 'Neapolitan', thumb: NeapolitanPizza, price: 5.5 }
];

const INITIAL_SELECTED_STATE = { id: 0, toppings: [], size: {}, type: {} };

function App() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(INITIAL_SELECTED_STATE);

  const [confirmedItems, setConfirmedItems] = useState([]);

  const toggleModal = () => setShow(prev => !prev);

  return (
    <div className="container">
      <Row>
        <Col md={8} className="pizzas-list">
          {PIZZAS_TYPE.map(type => (
            <PizzaCard
              key={type.name}
              type={type}
              toggleModal={toggleModal}
              setSelected={setSelected}
            />
          ))}
        </Col>
        <Col md={4}>
          <Basket
            confirmedItems={confirmedItems}
            setConfirmedItems={setConfirmedItems}
          />
        </Col>
      </Row>
      <SelectionModal
        show={show}
        setSelected={setSelected}
        selected={selected}
        setConfirmedItems={setConfirmedItems}
        toggleModal={toggleModal}
      />
    </div>
  );
}

export default App;
