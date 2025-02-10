import React from 'react';
import { ParishPersonnel } from '../../data/ParishPersonelData';
import { CardParishPersonnel } from './CardParishPersonnel';

export const ParishCouncil: React.FC = () => {
    return (
        <div className="w-full p-4 flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-24">
            {ParishPersonnel.map((parishPersonnel) => (
                <CardParishPersonnel
                    key={parishPersonnel.id}
                    id={parishPersonnel.id}
                    image={parishPersonnel.image}
                    names={parishPersonnel.names}
                    position={parishPersonnel.position}
                    phone={parishPersonnel.phone}
                    email={parishPersonnel.email}
                />
            ))}
        </div>
    );
}
