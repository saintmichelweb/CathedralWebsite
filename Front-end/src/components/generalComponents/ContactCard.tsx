import React from 'react';
import { Link } from 'react-router-dom';

interface ContactCardProps {
    id: number;
    name: string;
    position: string;
    phone: string;
    email: string;
    image: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({ id, name, position, phone, email, image }) => {
    return (
        <Link to={`/commissionPage/${id}`} className="block p-4 bg-custom-blue shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <h6 className="text-xs font-medium text-customYellow mb-2">{position}</h6>
            <div className="flex items-center" key={id}>
                <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover mr-4" />
                <div>
                    <p className="text-sm text-white">{name}</p>
                    <p className="text-sm text-white">Tel: {phone}</p>
                    <p className="text-sm text-white">Email: {email}</p>
                </div>
            </div>
        </Link>
    );
};
