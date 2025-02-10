import { CommissionLeaderContactData } from "../../data/CommissionLeaderContactData";
import { ContactCard } from "../generalComponents/ContactCard";

export const CommissionLeaders: React.FC = () => {
    return (
        <div className="p-6">
            <h2 className=" text-custom-blue text-2xl font-bold mb-6">Our Commissions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {CommissionLeaderContactData.map(contact => (
                    <ContactCard
                        key={contact.id}
                        id={contact.id}
                        name={contact.name}
                        position={contact.position}
                        phone={contact.phone}
                        email={contact.email}
                        image={contact.image}
                    />
                ))}
            </div>
        </div>
    );
}