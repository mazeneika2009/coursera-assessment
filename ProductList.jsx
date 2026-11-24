import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        {
          name: 'Snake Plant',
          image: 'https://pixabay.com',
          description: 'Produces oxygen at night, improving air quality.',
          cost: '$15',
        },
        {
          name: 'Spider Plant',
          image: 'https://pixabay.com',
          description: 'Filters formaldehyde and xylene from the air.',
          cost: '$12',
        },
        {
          name: 'Peace Lily',
          image: 'https://pixabay.com',
          description: 'Removes mold spores and purifies indoor air.',
          cost: '$18',
        },
        {
          name: 'Boston Fern',
          image: 'https://pixabay.com',
          description: 'Adds humidity to the air and removes toxins.',
          cost: '$20',
        },
        {
          name: 'Rubber Plant',
          image: 'https://pixabay.com',
          description: 'Easy to care for and effective at removing toxins.',
          cost: '$17',
        },
        {
          name: 'Aloe Vera',
          image: 'https://pixabay.com',
          description: 'Purifies the air and provides soothing gel for skin.',
          cost: '$14',
        },
      ],
    },
    {
      category: 'Aromatic Fragrant Plants',
      plants: [
        {
          name: 'Lavender',
          image: 'https://unsplash.com',
          description: 'Calming scent, used in aromatherapy and relaxation.',
          cost: '$20',
        },
        {
          name: 'Jasmine',
          image: 'https://unsplash.com',
          description: 'Sweet fragrance that promotes relaxation and sleep.',
          cost: '$18',
        },
        {
          name: 'Rosemary',
          image: 'https://pixabay.com',
          description: 'Invigorating scent, often used in cooking.',
          cost: '$15',
        },
        {
          name: 'Mint',
          image: 'https://pixabay.com',
          description: 'Refreshing aroma, great for teas and culinary dishes.',
          cost: '$12',
        },
        {
          name: 'Lemon Balm',
          image: 'https://pixabay.com',
          description: 'Citrusy scent that relieves stress and promotes sleep.',
          cost: '$14',
        },
        {
          name: 'Hyacinth',
          image: 'https://pixabay.com',
          description: 'Hyacinth is a beautiful flowering plant known for its fragrance.',
          cost: '$22',
        },
      ],
    },
    {
      category: 'Medicinal Plants',
      plants: [
        {
          name: 'Echinacea',
          image: 'https://pixabay.com',
          description: 'Boosts immune system and helps fight colds.',
          cost: '$16',
        },
        {
          name: 'Peppermint',
          image: 'https://pixabay.com',
          description: 'Relieves digestive issues and headaches.',
          cost: '$13',
        },
        {
          name: 'Chamomile',
          image: 'https://pixabay.com',
          description: 'Soothes anxiety and promotes restful sleep.',
          cost: '$15',
        },
        {
          name: 'Calendula',
          image: 'https://pixabay.com',
          description: 'Heals wounds and soothes skin irritations.',
          cost: '$12',
        },
        {
          name: 'Basil',
          image: 'https://pixabay.com',
          description: 'Reduces stress and supports immune health.',
          cost: '$11',
        },
        {
          name: 'Sage',
          image: 'https://pixabay.com',
          description: 'Supports memory and has anti-inflammatory properties.',
          cost: '$14',
        },
      ],
    },
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const isItemInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName) || addedToCart[plantName];
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>
          <div>
            <h3>Paradise Nursery</h3>
            <small>Where Green Meets Serenity</small>
          </div>
        </div>
        <div className="navbar-links">
          <button onClick={() => setShowCart(false)}>Plants</button>
          <div className="cart-icon-container" onClick={() => setShowCart(true)}>
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 256 256"
              height="36"
              width="36"
              fill="none"
              stroke="#ffffff"
              strokeWidth="12"
            >
              <circle cx="80" cy="216" r="12" />
              <circle cx="184" cy="216" r="12" />
              <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" />
            </svg>
            <span className="cart-badge">{calculateTotalQuantity()}</span>
          </div>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="product-list">
                {categoryObj.plants.map((plant, plantIndex) => {
                  const added = isItemInCart(plant.name);
                  return (
                    <div className="product-card" key={plantIndex}>
                      <img
                        className="product-image"
                        src={plant.image}
                        alt={plant.name}
                      />
                      <div className="product-title">{plant.name}</div>
                      <div className="product-price">{plant.cost}</div>
                      <div className="product-description">{plant.description}</div>
                      <button
                        className={`product-button ${added ? 'added-to-cart' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={added}
                      >
                        {added ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
