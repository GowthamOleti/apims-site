import { ArrowLeft } from 'lucide-react'
import './WaysideAmenities.css'

function WaysideAmenities() {
  return (
    <div className="wayside-page">
      {/* Header */}
      <header className="wayside-header">
        <div className="header-container">
          <a href="/" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="wayside-hero">
        <div className="hero-container">
          <span className="hero-tag">Infrastructure · Expressway</span>
          <h1 className="hero-title">Wayside Amenities Project</h1>
          <p className="hero-subtitle">
            Transforming India's highway experience with world-class amenities on the Bengaluru-Chennai Expressway
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="wayside-article">
        <div className="article-container">
          {/* Introduction */}
          <div className="article-section">
            <h2>India's First Premium Expressway Amenities</h2>
            <p>
              APIMS is proud to be part of a groundbreaking infrastructure initiative that's setting new 
              standards for highway travel in India. Our wayside amenities project on the Bengaluru-Chennai 
              Expressway represents a significant leap forward in providing world-class facilities for travelers.
            </p>
          </div>

          {/* Image 1 */}
          <figure className="article-image">
            <img 
              src="https://static.wixstatic.com/media/5c0589_b656f1b9f1e34d389dad8aaba50d54d4~mv2.jpeg" 
              alt="Wayside amenities overview"
            />
            <figcaption>State-of-the-art wayside amenity complex</figcaption>
          </figure>

          {/* Section 1 */}
          <div className="article-section">
            <h2>Strategic Locations</h2>
            <p>
              The project encompasses three strategic locations along the 262 km expressway corridor, 
              connecting South India's major growth engines. Each site is strategically positioned to 
              provide convenient access and premium services to travelers.
            </p>
          </div>

          {/* Image 2 */}
          <figure className="article-image">
            <img 
              src="https://static.wixstatic.com/media/5c0589_e703517df2354e0faa28db90202a89dc~mv2.jpeg" 
              alt="Highway amenities facility"
            />
            <figcaption>Modern architectural design with premium facilities</figcaption>
          </figure>

          {/* Section 2 */}
          <div className="article-section">
            <h2>World-Class Amenities</h2>
            <p>
              Our facilities set new benchmarks in highway infrastructure with comprehensive amenities including:
            </p>
            <ul>
              <li><strong>Food Courts:</strong> 80,000 sq ft of dining space featuring regional and international cuisine</li>
              <li><strong>EV Charging:</strong> High-capacity charging stations for electric vehicles</li>
              <li><strong>Truck Facilities:</strong> 300+ parking spaces with complete driver amenities</li>
              <li><strong>Solar Power:</strong> 1 MW capacity ensuring sustainable operations</li>
            </ul>
          </div>

          {/* Image 3 */}
          <figure className="article-image">
            <img 
              src="https://static.wixstatic.com/media/5c0589_cd3353d66af84c369f0d8da9734e03c1~mv2.jpeg" 
              alt="Amenity center facilities"
            />
            <figcaption>Comprehensive facilities for travelers and commercial vehicles</figcaption>
          </figure>

          {/* Section 3 */}
          <div className="article-section">
            <h2>Impact & Scale</h2>
            <p>
              This landmark project positions APIMS as a pioneer in India's infrastructure transformation. 
              With 94 acres of total land, 30-year lease periods, and serving over 50,000 daily travelers, 
              we're creating destinations that redefine highway travel for millions.
            </p>
            <p>
              The project represents our commitment to excellence in infrastructure development and our vision 
              of building India's future through strategic investments in essential facilities.
            </p>
          </div>

          {/* Image 4 */}
          <figure className="article-image">
            <img 
              src="https://static.wixstatic.com/media/5c0589_1c2beb8f5d18446d9c0d7f3257078d35~mv2.jpeg" 
              alt="Expressway wayside complex"
            />
            <figcaption>Setting new standards for highway infrastructure in India</figcaption>
          </figure>

          {/* Closing */}
          <div className="article-section">
            <h2>Building the Future</h2>
            <p>
              As we continue to develop these world-class facilities, APIMS remains committed to delivering 
              infrastructure that not only meets international standards but also contributes to India's 
              economic growth and development. This project is just one example of how we're building India 
              brick by brick.
            </p>
          </div>

          {/* CTA */}
          <div className="article-cta">
            <h3>Interested in learning more about our infrastructure projects?</h3>
            <a href="mailto:contact@apimsindia.com" className="cta-button">
              Get in Touch
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}

export default WaysideAmenities

