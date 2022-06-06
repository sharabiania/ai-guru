import React from 'react';
import './contacts.css';
export default function AGContact() {
  return (
    <section className='ag-contacts'>
      <ul style={{listStyle: 'none', padding: 0}}>
        <li><a href="#">Help & Support</a></li>
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </section>
  );
}