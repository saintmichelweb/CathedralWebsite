import React from 'react';

interface CardParishPersonnelProps {
    id: number;
    image: string;
    names: string;
    position: string;
    phone: string;
    email: string;
}

export const CardParishPersonnel: React.FC<CardParishPersonnelProps> = ({ id, image, names, position, phone, email }) => {
    return (
        <div
            className="relative w-full max-w-xs h-80 bg-cover bg-center border-2 rounded-sm border-custom-blue  overflow-hidden shadow-custom-dark transition-transform transform hover:scale-105 hover:shadow-xl"
            style={{ backgroundImage: `url(${image})` }}
            aria-labelledby={`card-${id}`}
        >
            <div
                className="absolute inset-0 bg-gradient-to-t from-[#223B7D] via-transparent to-transparent flex flex-col justify-end p-4 "
                aria-labelledby={`card-${id}`}
            >
                <div className="text-white">
                    <h5 id={`card-${id}`} className="text-lg font-bold mb-1">{names}</h5>
                    <h6 className="text-sm mb-1">{position}</h6>
                    <p className="text-sm mb-1">Tel: {phone}</p>
                    <p className="text-sm">Email: {email}</p>
                </div>
            </div>
        </div>
    );
}
