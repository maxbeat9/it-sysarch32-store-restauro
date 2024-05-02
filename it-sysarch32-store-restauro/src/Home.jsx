import React, { useState, useRef, useEffect } from 'react';

function Home() {
  const [expandedImage, setExpandedImage] = useState(null);
  const expandedImageRef = useRef(null);

  const handleExpandClick = (imageUrl) => {
    setExpandedImage((prevExpandedImage) => (prevExpandedImage === imageUrl ? null : imageUrl));
  };

  const handleClickOutside = (event) => {
    if (expandedImageRef.current && !expandedImageRef.current.contains(event.target)) {
      setExpandedImage(null);
    }
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
        <div className="product-item">
          <img src="https://moto.yugatech.com/wp-content/uploads/2023/05/yamaha-r15-v4-and-r15s-2023-launched-what-you-need-to-know.jpeg" alt="Yamaha r15 white" />
          <div className="button-container">
            <button className="button" onClick={() => handleExpandClick("https://moto.yugatech.com/wp-content/uploads/2023/05/yamaha-r15-v4-and-r15s-2023-launched-what-you-need-to-know.jpeg")}>
              Expand
            </button>
          </div>
        </div>

        <div className="product-item">
          <img src="https://assets.otocapital.in/prod/racing-blue-yamaha-r15-v3-image.jpeg" alt="Yamaha r15 blue" />
          <div className="button-container">
            <button className="button" onClick={() => handleExpandClick("https://assets.otocapital.in/prod/racing-blue-yamaha-r15-v3-image.jpeg")}>
              Expand
            </button>
          </div>
        </div>

        <div className="product-item">
          <img src="https://imgd.aeplcdn.com/370x208/n/cw/ec/108277/yamaha-yzf-r15-right-side-view1.jpeg?isig=0&q=80" alt="Yamaha r15 blue" />
          <div className="button-container">
            <button className="button" onClick={() => handleExpandClick("https://imgd.aeplcdn.com/370x208/n/cw/ec/108277/yamaha-yzf-r15-right-side-view1.jpeg?isig=0&q=80")}>
              Expand
            </button>
          </div>
        </div>

        <div className="product-item">
          <img src="https://cdn.motor1.com/images/mgl/W8GoQN/s3/yamaha-refreshes-yzf-r125-and-yzf-r15-sportbikes-in-japan.jpg" alt="Yamaha r15 blue" />
          <div className="button-container">
            <button className="button" onClick={() => handleExpandClick("https://cdn.motor1.com/images/mgl/W8GoQN/s3/yamaha-refreshes-yzf-r125-and-yzf-r15-sportbikes-in-japan.jpg")}>
              Expand
            </button>
          </div>
        </div>

        <div className="product-item">
          <img src="https://www.perfectriders.in/wp-content/uploads/2024/01/magenta.webp" alt="Yamaha r15 blue" />
          <div className="button-container">
            <button className="button" onClick={() => handleExpandClick("https://www.perfectriders.in/wp-content/uploads/2024/01/magenta.webp")}>
              Expand
            </button>
          </div>
        </div>
      </div>

      {expandedImage && (
        <div className="expanded-image" ref={expandedImageRef}>
          <img src={expandedImage} alt="Expanded" />
        </div>
      )}
    </div>
  );
}

export default Home;
