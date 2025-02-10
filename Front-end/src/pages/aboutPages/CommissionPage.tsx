import React from 'react';
import { useParams } from 'react-router-dom';
import { CommissionLeaderContactData } from '../../data/CommissionLeaderContactData';

interface Contact {
    id: number;
    name: string;
    position: string;
    phone: string;
    email: string;
    image: string;
    content?: string;
}

export const CommissionPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id || isNaN(parseInt(id, 10))) {
        return <div className="p-4 text-center">Invalid contact ID</div>;
    }

    const contactId = parseInt(id, 10);
    const contact = CommissionLeaderContactData.find((contact: Contact) => contact.id === contactId);

    if (!contact) {
        return <div className="p-4 text-center">Contact not found</div>;
    }

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-4">{contact.position}</h1>
            <div className="flex items-center mb-6">
                <img
                    src={contact.image}
                    alt={contact.name}
                    className="w-24 h-24 rounded-full object-cover mr-4 border-2 border-gray-200 shadow-md"
                />
                <div>
                    <h2 className="text-xl font-semibold mb-2">{contact.name}</h2>
                    <p className="text-sm text-gray-600 mb-1">Phone: {contact.phone}</p>
                    <p className="text-sm text-gray-600 mb-4">Email: {contact.email}</p>
                </div>
            </div>
            {contact.content && <p className="text-base text-gray-700">{contact.content}</p>}
            <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline mt-4 inline-block">
                Send an Email
            </a>
        </div>
    );
};
