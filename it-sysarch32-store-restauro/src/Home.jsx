import React, { useState, useRef, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const firebaseConfig = {
  apiKey: "AIzaSyBSKXnYXb3Xlwvxs8ygDSxhN8a0XigP19I",
  authDomain: "it-sysarch32-store-restauro.firebaseapp.com",
  projectId: "it-sysarch32-store-restauro",
  storageBucket: "it-sysarch32-store-restauro.appspot.com",
  messagingSenderId: "552128528292",
  appId: "1:552128528292:web:ca0e820070bbb3930f8b31",
  measurementId: "G-DQ0S5S2WDK"
};

initializeApp(firebaseConfig);

const stripePromise = loadStripe('pk_test_51PF3CWH1wSRd6BtMBugxL1VdnrP3FEvUpo86oqN0XVvoF73lvCQMpFaMqTe1TekjjaS9G1cx6MhBqT1Na7i8DBUs00ALPrQ5I3');

function Home() {
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const expandedImageRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = getFirestore();
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          imageUrl: doc.data().imageUrl,
          description: doc.data().Description,
          price: doc.data().Price
        }));
        console.log("Fetched products:", productsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleExpandClick = (product) => {
    setExpandedProduct((prevExpandedProduct) => (prevExpandedProduct === product ? null : product));
  };

  const handleClickOutside = (event) => {
    if (expandedImageRef.current && !expandedImageRef.current.contains(event.target)) {
      setExpandedProduct(null);
    }
  };

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems];
      newCartItems.splice(index, 1);
      return newCartItems;
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log("Cart items changed:", cartItems);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    setTotalPrice(totalPrice);
  }, [cartItems]);
  
  // const handleCheckout = async () => {
  //   const stripe = await stripePromise;

  //   try {
  //     const response = await axios.post('http://localhost:4000/create-checkout-session', {
  //       cartItems,
  //       totalPrice: totalPrice.toString() // Convert totalPrice to a string
  //     });

  //     const session = await response.data;
  //     const result = await stripe.redirectToCheckout({
  //       sessionId: session.id,
  //     });

  //     if (result.error) {
  //       console.error(result.error.message);
  //     }
  //   } catch (error) {
  //     console.error('Error creating checkout session:', error);
  //   }
  // };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    
    try {
      // Calculate total price dynamically
      const totalPrice = cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
    
      const response = await axios.post('http://localhost:4000/create-checkout-session', {
        cartItems,
        totalPrice: totalPrice.toString() // Convert totalPrice to a string
      });
    
      const session = await response.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };
  
  
  
  

  return (
    <div>
      <div className="featureTitle">
        <h1><p>Featured</p></h1>
      </div>

      <div className="bannerHolder">
        <img className="bannerImage" src="https://d1hv7ee95zft1i.cloudfront.net/custom/motorcycle-model-photo/mobile/gallery/5e216344b3450.jpg" alt="Featured" />
      </div>
      
      <div className="product-holder">
        {products.map((product, index) => (
          <div className="product-item" key={product.id}>
            <img src={product.imageUrl} alt={product.description} />
            <div className="button-container">
              <button className="button" onClick={() => handleExpandClick(product)}>
                Expand
              </button>
            </div>
          </div>
        ))}
      </div>

      {expandedProduct && (
        <div className="expanded-image" ref={expandedImageRef}>
          <img src={expandedProduct.imageUrl} alt="Expanded" />
          <div>
            {expandedProduct.description && <p className="expandedtext">{expandedProduct.description}</p>}
            {expandedProduct.price && <p className="expandedtext">Price: {expandedProduct.price}</p>}
          </div>
          <button className="add-to-cart-button" onClick={() => handleAddToCart({ ...expandedProduct, quantity: 1 })}>Add to Cart</button>
        </div>
      )}

      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <img src={item.imageUrl} alt="Cart Item" style={{ width: '300px' }} />
              <p className="white-text">{item.description}</p>
              <p className="white-text">Price: {item.price * item.quantity}</p>
              <button className="button" onClick={() => handleRemoveFromCart(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <p className="white-text">Total Price: {totalPrice}</p>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}

export default Home;
