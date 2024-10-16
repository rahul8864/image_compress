import React, { useState } from 'react';
import Compressor from 'compressorjs';

const App = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(files);
  };

  const handleConvert = () => {
    selectedImages.forEach((file) => {
      new Compressor(file, {
        quality: 0.6, // Adjust quality as needed
        convertSize: Infinity,
        mimeType: 'image/webp',
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onloadend = () => {
            setConvertedImages((prev) => [
              ...prev,
              { original: file, webp: reader.result, size: result.size },
            ]);
          };
        },
        error(err) {
          console.error('Compression error:', err);
        },
      });
    });
  };

  console.log(convertedImages)

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      <button onClick={handleConvert}>Convert to WebP</button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {convertedImages.map((image, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <div>
              <p>Original PNG:</p>
              <img src={URL.createObjectURL(image.original)} alt={`Original ${index}`} style={{ maxWidth: '200px', height: 'auto' }} />
              <p>Size: {(image.original.size / 1024).toFixed(2)} KB</p>
            </div>
            <div>
              <p>Converted WebP:</p>
              <img src={image.webp} alt={`Converted ${index}`} style={{ maxWidth: '200px', height: 'auto' }} />
              <p>Size: {(image.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
