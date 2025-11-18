import { useState, useEffect } from 'react'
import './WaysideAmenities.css'

function WaysideAmenities() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="wayside-page">
      {/* Navigation */}
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="landing-nav-container">
          <div className="landing-nav-logo">
            <img
              src="/apims-logo.png"
              alt="APIMS logo"
              className="landing-logo-img"
            />
            <span className="logo-text">APIMS</span>
          </div>
          <div className="landing-nav-links">
            <a href="/">Home</a>
            <a href="/#about">About</a>
            <a href="/#services">Services</a>
            <a href="/#directors">Leadership</a>
            <a href="/#verticals">Verticals</a>
            <a href="/#contact">Contact</a>
          </div>
          <a
            className="landing-nav-cta"
            href="mailto:apimsindia@gmail.com?subject=Hey%20APIMS%2C%20I%20have%20an%20idea.."
          >
            Get a Quote
          </a>
        </div>
      </nav>

      {/* Hero with Image */}
      <section className="wayside-hero-image">
        <img 
          src="https://static.wixstatic.com/media/5c0589_84f5636d3922464bba52db56be305592~mv2.png" 
          alt="Bengaluru-Chennai Expressway Map"
          className="wayside-hero-img"
        />
      </section>

      {/* Content */}
      <article className="wayside-article">
        <div className="article-container">
          {/* Introduction */}
          <div className="article-section">
            <h2>YSEIL's Landmark Infrastructure Project</h2>
            <p>
              <strong>YSEIL</strong> is proud to be leading a groundbreaking infrastructure initiative that's setting new 
              standards for highway travel in India. Our wayside amenities project on the <strong>Bengaluru-Chennai Expressway</strong> 
              represents a significant leap forward in providing world-class facilities for travelers across South India's 
              major corridors, connecting the vibrant cities of <strong>Bengaluru</strong>, <strong>Kolar</strong>, <strong>Chittor</strong>, 
              <strong> Kanchipuram</strong>, and <strong>Chennai</strong>.
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
            <h2>Strategic Locations Across South India</h2>
            <p>
              <strong>YSEIL's</strong> project encompasses three strategic locations along the 262 km 
              <strong> Bengaluru-Chennai Expressway</strong>, connecting South India's major growth engines: 
              <strong> Bengaluru</strong>, <strong>Kolar</strong>, <strong>Chittor</strong>, <strong>Kanchipuram</strong>, and <strong>Chennai</strong>. 
              Each site is strategically positioned to provide convenient access and premium services to travelers 
              along this critical transportation corridor.
            </p>
            <div className="cities-highlight">
              <div className="city-card">
                <h3>Kolar, Bangalore</h3>
                <p>27.7 Acres • Gateway Site • 16,889 vehicles/day</p>
              </div>
              <div className="city-card">
                <h3>Chittor</h3>
                <p>33.5 Acres • Pilgrim's Haven • 14,610 vehicles/day</p>
              </div>
              <div className="city-card">
                <h3>Kanchipuram, Chennai</h3>
                <p>30.8 Acres • Logistics Hub • 18,362 vehicles/day</p>
              </div>
            </div>
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
              This landmark <strong>YSEIL</strong> project positions us as a pioneer in India's infrastructure transformation. 
              With 94 acres of total land spanning across <strong>Kolar</strong>, <strong>Chittor</strong>, and 
              <strong> Kanchipuram</strong>, connecting the major cities of <strong>Bengaluru</strong> and <strong>Chennai</strong>, 
              30-year lease periods, and serving over 50,000 daily travelers, we're creating destinations that redefine 
              highway travel for millions across South India.
            </p>
            <p>
              The project represents <strong>YSEIL's</strong> commitment to excellence in infrastructure development and our vision 
              of building India's future through strategic investments in essential facilities that connect 
              <strong> Bengaluru</strong>, <strong>Kolar</strong>, <strong>Chittor</strong>, <strong>Kanchipuram</strong>, and <strong>Chennai</strong>.
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
              As <strong>YSEIL</strong> continues to develop these world-class facilities along the 
              <strong> Bengaluru-Chennai Expressway</strong>, we remain committed to delivering 
              infrastructure that not only meets international standards but also contributes to India's 
              economic growth and development. This project connecting <strong>Bengaluru</strong>, 
              <strong> Kolar</strong>, <strong>Chittor</strong>, <strong>Kanchipuram</strong>, and 
              <strong> Chennai</strong> is just one example of how we're building India brick by brick.
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

      {/* Footer */}
      <footer className="landing-footer" id="contact">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>APIMS INDIA</h4>
              <p>Private Limited</p>
              <p className="footer-tagline">
                Building prosperous, sustainable futures through strategic investments and partnerships.
              </p>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <a href="/#about">About Us</a>
              <a href="/#services">Our Services</a>
              <a href="/#directors">Leadership</a>
              <a href="/#verticals">Verticals</a>
            </div>
            <div className="footer-col">
              <h5>Services</h5>
              <a href="/#services">Financial Services</a>
              <a href="/#services">Corporate Services</a>
              <a href="/#services">Training Programs</a>
              <a href="/#services">Consulting</a>
            </div>
            <div className="footer-col">
              <h5>Contact</h5>
              <a href="mailto:contact@apimsindia.com">+91 99499 45699</a>
              <a href="mailto:contact@apimsindia.com">contact@apimsindia.com</a>
              <div className="footer-social">
                <a
                  href="https://www.facebook.com/apimsindia"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noreferrer"
                >
                  f
                </a>
                <a
                  href="https://x.com/apimsindia"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noreferrer"
                >
                  𝕏
                </a>
                <a
                  href="https://www.linkedin.com/company/apims-india/"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noreferrer"
                >
                  in
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 APIMS INDIA Private Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default WaysideAmenities

