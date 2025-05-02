import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('diagnosis');
  const [error, setError] = useState(null);

  const analyzeImage = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const fileInput = document.querySelector("input[type=file]");
    if (!fileInput.files || fileInput.files.length === 0) {
      setError("Please select an image first");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setResult({
        plant: data.plant || "Unknown Plant",
        name: data.name === "Healthy" ? "Healthy" : data.name || "Unknown Disease",
        confidence: parseFloat(data.confidence) || 0.85,
        remedy: data.remedy || "No remedy information available.",
        prevention: data.prevention || "No prevention tips available."
      });
    } catch (err) {
      console.error("Image analysis failed:", err);
      setError(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      setError("Please upload an image file (JPEG, PNG)");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size too large (max 5MB)");
      return;
    }

    setError(null);
    setImage(URL.createObjectURL(file));
    analyzeImage();
  };

  const careTips = [
    "Water when top 1-2 inches of soil are dry",
    "Provide 6-8 hours of sunlight daily",
    "Use well-draining soil mix",
    "Rotate plants for even growth",
    "Prune dead or yellowing leaves regularly",
    "Use organic fertilizers for better growth"
  ];

  const suggestedProducts = [
    "Copper Fungicide Spray",
    "Neem Oil Concentrate",
    "Organic Plant Tonics",
    "Biological Pest Control",
    "pH Balanced Fertilizer"
  ];

  return (
    <div className="app">
      <header className="header">
        <h1><span className="leaf-icon">🌱</span> PlantDoctor AI</h1>
        <p>Instant plant disease diagnosis and organic care solutions</p>
      </header>

      <main className="main-content">
        <div className="upload-container">
          <div className="upload-card">
            <label className="upload-btn">
              {image ? 'Analyze Another Leaf' : 'Upload Leaf Photo'}
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={loading}
              />
            </label>
            <p className="upload-hint">JPG, PNG, or HEIC. Max 5MB.</p>
            {error && <p className="error-message">{error}</p>}
          </div>

          {image && (
            <div className="image-preview">
              <img src={image} alt="Uploaded plant" />
              <div className="image-overlay">
                <div className="loader-container">
                  {loading && (
                    <>
                      <ClipLoader color="#4CAF50" size={35} />
                      <p>Analyzing leaf patterns...</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {result && (
          <div className="results-container">
            <div className="results-tabs">
              <button 
                className={activeTab === 'diagnosis' ? 'active' : ''} 
                onClick={() => setActiveTab('diagnosis')}
              >
                Diagnosis
              </button>
              <button 
                className={activeTab === 'treatment' ? 'active' : ''} 
                onClick={() => setActiveTab('treatment')}
              >
                Treatment Plan
              </button>
              <button 
                className={activeTab === 'prevention' ? 'active' : ''} 
                onClick={() => setActiveTab('prevention')}
              >
                Prevention
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'diagnosis' && (
                <>
                  <h2>
                    <span className={`status-dot ${result.name.toLowerCase() === 'healthy' ? 'healthy' : 'diseased'}`}></span>
                    {result.name} detected on {result.plant}
                  </h2>
                  <div className="confidence-meter">
                    <div 
                      className="confidence-fill" 
                      style={{ width: `${Math.min(result.confidence * 100, 100)}%` }}
                    ></div>
                    <span>{(result.confidence * 100).toFixed(0)}% Confidence</span>
                  </div>
                  <p className="diagnosis-summary">
                    {result.name.toLowerCase() === 'healthy'
                      ? 'Your plant appears to be in good health with no visible signs of disease.'
                      : 'Our analysis indicates potential disease symptoms. See treatment recommendations.'}
                  </p>
                </>
              )}

              {activeTab === 'treatment' && (
                <>
                  <h2>Recommended Treatment</h2>
                  <div className="treatment-card">
                    <div className="treatment-icon">💊</div>
                    <div>
                      <h3>Immediate Action</h3>
                      <p>{result.remedy}</p>
                    </div>
                  </div>
                  <div className="product-recommendation">
                    <h3>Suggested Products</h3>
                    <ul>
                      {suggestedProducts.map((product, index) => (
                        <li key={index}>{product}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {activeTab === 'prevention' && (
                <>
                  <h2>Prevention Tips</h2>
                  <div className="tips-grid">
                    {careTips.map((tip, index) => (
                      <div key={index} className="tip-card">
                        <div className="tip-number">{index + 1}</div>
                        <p>{tip}</p>
                      </div>
                    ))}
                  </div>
                  <div className="prevention-notes">
                    <h3>Additional Recommendations</h3>
                    <p>{result.prevention}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>🌿 Grow happy plants with AI-powered care</p>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
        </div>
        <p className="disclaimer">
          Note: This is an AI-powered diagnosis tool. For severe plant health issues, 
          consult with a professional horticulturist.
        </p>
      </footer>
    </div>
  );
}

export default App;