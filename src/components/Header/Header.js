import './Header.css';
// import { useState } from 'react';

export default function Header({ title }) {
    return (
        <div className="Header">
            {title}
            {/* <button>N</button> */}
        </div>
    )
}