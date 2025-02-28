import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo.png';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-custom-blue text-customYellow ">
            <div className='bg-customYellow left-0 top-0 w-full h-3'></div>
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8 p-8">
                {/* Logo Column */}
                <div className="flex flex-col items-center sm:items-start">
                    <img src={logo} alt="Logo" className="w-32 mb-4" />
                </div>

                {/* Menu Column */}
                <div className='flex items-center justify-center flex-col text-center'>
                    <h3 className="text-lg font-bold mb-4">Menu</h3>
                    <ul className="space-y-2">
                        <li><Link to="/">{'Home'}</Link></li>
                        <li><Link to="/about">{'About'}</Link></li>
                        <li><Link to="/service">{'Service'}</Link></li>
                        <li><Link to="/layLeader">{'Our Leaders'}</Link></li>
                        <li><Link to="/chorals">{'Our Chorales'}</Link></li>
                        <li><Link to="/catholicAction">{'Catholic Action'}</Link></li>
                    </ul>
                </div>

                {/* Sacraments Column */}
                <div className='flex items-center justify-center flex-col text-center'>
                    <h3 className="text-lg font-bold mb-4">Sacraments</h3>
                    <ul className="space-y-2">
                        <li><Link to="/baptism">{'Baptism'}</Link></li>
                        <li><Link to="/eucharist">{'Eucharist'}</Link></li>
                        <li><Link to="/confirmation">{'Confirmation'}</Link></li>
                        <li><Link to="/marriage">{'Marriage'}</Link></li>
                        <li><Link to="/reconciliation">{'Reconciliation'}</Link></li>
                        <li><Link to="/anointing">{'Anointing of the Sick'}</Link></li>
                    </ul>
                </div>

                {/* Address Column */}
                <div className='flex items-center justify-center flex-col text-center'>
                    <h3 className="text-lg font-bold mb-4">Address</h3>
                    <p>{'Cathedral Saint Michel'}</p>
                    <p>{'123 Cathedral Road'}</p>
                    <p>{'City Name, Country'}</p>
                    <p>{'Phone: (123) 456-7890'}</p>
                    <p>{'Email: info@cathedralstmichael.com'}</p>

                    <>
                        <h6>Follow us:</h6>
                    </>
                </div>
            </div>
            <div className='bg-customYellow left-0  w-full h-[1px] mt-8'></div>
            <div className="text-center  text-sm p-1">
                <p>&copy; {new Date().getFullYear()} Cathedral Saint Michel. All rights reserved.</p>
            </div>
            <div className='bg-customYellow left-0 bottom-0 w-full h-2'></div>
        </footer>
    );
};

export default Footer;
