import React from 'react'
import './contact.css'
const contact = () => {
  return (
   <section className="contact-section">
      <h2 className="contact-title">Contact Me</h2>
      <div className="contact-container">
        <div className="contact-item">
          <a href="mailto:jakkalaramu2005@gmail.com" className="contact-link">
            📧 Email: jakkalaramu2005@gmail.com
          </a>
        </div>
        <div className="contact-item">
          <span className="contact-text">📞 Phone: +91 98765 43210</span>
        </div>
        <div className="contact-item">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            💬 WhatsApp Chat
          </a>
        </div>
      </div>
    </section>
  )
}

export default contact
