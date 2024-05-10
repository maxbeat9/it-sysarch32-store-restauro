import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import React, { useState, useRef, useEffect } from 'react';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBSKXnYXb3Xlwvxs8ygDSxhN8a0XigP19I",
  authDomain: "it-sysarch32-store-restauro.firebaseapp.com",
  projectId: "it-sysarch32-store-restauro",
  storageBucket: "it-sysarch32-store-restauro.appspot.com",
  messagingSenderId: "552128528292",
  appId: "1:552128528292:web:ca0e820070bbb3930f8b31",
  measurementId: "G-DQ0S5S2WDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function Home() {
  const [expandedImage, setExpandedImage] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

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

  const handleExpandClick = (imageUrl) => {
    setExpandedImage((prevExpandedImage) => (prevExpandedImage === imageUrl ? null : imageUrl));
  };

  const handleClickOutside = (event) => {
    if (expandedImageRef.current && !expandedImageRef.current.contains(event.target)) {
      setExpandedImage(null);
    }
  };

  const handleAddToCart = (imageUrl) => {
    setCartItems((prevCartItems) => [...prevCartItems, imageUrl]);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prevCartItems) => prevCartItems.filter((_, i) => i !== index));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              <button className="button" onClick={() => handleExpandClick(product.imageUrl)}>
                Expand
              </button>
            </div>
          </div>
        ))}
      </div>

      {expandedImage && (
        <div className="expanded-image" ref={expandedImageRef}>
          <img src={expandedImage} alt="Expanded" />
          <button className="add-to-cart-button" onClick={() => handleAddToCart(expandedImage)}>Add to Cart</button>
        </div>
      )}

      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <img src={item} alt="Cart Item" style={{ width: '300px' }} />
              <button className="button" onClick={() => handleRemoveFromCart(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
