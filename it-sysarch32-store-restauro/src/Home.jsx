import React, { useState, useRef, useEffect } from 'react';

function Home() {
  const [expandedImage, setExpandedImage] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const expandedImageRef = useRef(null);

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

  const products = [
    {
      imageUrl: "https://moto.yugatech.com/wp-content/uploads/2023/05/yamaha-r15-v4-and-r15s-2023-launched-what-you-need-to-know.jpeg",
      name: "Yamaha r15 white"
    },
    {
      imageUrl: "https://assets.otocapital.in/prod/racing-blue-yamaha-r15-v3-image.jpeg",
      name: "Yamaha r15 blue"
    },
    {
      imageUrl: "https://imgd.aeplcdn.com/370x208/n/cw/ec/108277/yamaha-yzf-r15-right-side-view1.jpeg?isig=0&q=80",
      name: "Yamaha r15 blue"
    },
    {
      imageUrl: "https://cdn.motor1.com/images/mgl/W8GoQN/s3/yamaha-refreshes-yzf-r125-and-yzf-r15-sportbikes-in-japan.jpg",
      name: "Yamaha r15 blue"
    },
    {
      imageUrl: "https://www.perfectriders.in/wp-content/uploads/2024/01/magenta.webp",
      name: "Yamaha r15 blue"
    }
  ];

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
          <div className="product-item" key={index}>
            <img src={product.imageUrl} alt={product.name} />
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
