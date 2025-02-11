import React from "react";
import { useParams, Link } from "react-router-dom";

const communities = [
    {
        id: 1,
        name: "Kinyarwanda Community",
        language: "Kinyarwanda",
        leader: {
            name: "John Karekezi",
            phone: "+250 788 123 456",
            picture: "path/to/kinyarwanda-leader.jpg",
        },
        description:
            "The Kinyarwanda Community brings together members who worship in Kinyarwanda. It fosters a deep sense of cultural and spiritual connection through its subcommunities and chorales.",
        subcommunities: [
            {
                name: "CEB Nyamirambo",
                leader: {
                    name: "Jean Ndayisaba",
                    phone: "+250 788 654 321",
                    email: "jean.ndayisaba@example.com",
                },
            },
        ],
        chorales: ["Chorale Inyamibwa", "Chorale Abahuza"],
    },
    {
        id: 2,
        name: "English Community",
        language: "English",
        leader: {
            name: "Alice Smith",
            phone: "+250 789 987 654",
            picture: "path/to/english-leader.jpg",
        },
        description:
            "The English Community serves members who worship in English. It promotes spiritual growth and cultural exchange within its vibrant community.",
        subcommunities: [
            {
                name: "CEB Kicukiro",
                leader: {
                    name: "Mark Johnson",
                    phone: "+250 789 654 321",
                    email: "mark.johnson@example.com",
                },
            },
        ],
        chorales: ["Chorale Harmony", "Chorale Grace"],
    },
    {
        id: 3,
        name: "French Community",
        language: "French",
        leader: {
            name: "Jean-Pierre Dubois",
            phone: "+250 722 123 789",
            picture: "path/to/french-leader.jpg",
        },
        description:
            "The French Community unites members who worship in French. It celebrates a rich spiritual and cultural heritage through its services and events.",
        subcommunities: [
            {
                name: "CEB Remera",
                leader: {
                    name: "Claire Fontaine",
                    phone: "+250 722 456 789",
                    email: "claire.fontaine@example.com",
                },
            },
        ],
        chorales: ["Chorale Lumière", "Chorale Espérance"],
    },
];






export const CatholicActionsDetailsPage: React.FC = ()=>{

    const { id } = useParams<{ id: string }>();
    const community = communities.find((c) => c.id === parseInt(id || ""));

    if (!community) {
        return <div>Community not found</div>;
    }

    return(
        <div className="w-full p-6">
            <h1 className="text-3xl font-bold text-center mb-6">{community.name}</h1>
            <img
                src={community.leader.picture}
                alt={`${community.name} leader`}
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
            />
            <p className="text-lg text-gray-700 mb-4">
                <strong>Language:</strong> {community.language}
            </p>
            <p className="text-lg text-gray-700 mb-4">
                <strong>Leader:</strong> {community.leader.name}
            </p>
            <p className="text-lg text-gray-700 mb-4">
                <strong>Phone:</strong> {community.leader.phone}
            </p>
            <p className="text-lg text-gray-700 mb-6">{community.description}</p>
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Subcommunities (CEC)
                </h2>
                {community.subcommunities.map((sub, idx) => (
                    <div key={idx} className="mb-4">
                        <p className="text-gray-700">
                            <strong>Name:</strong> {sub.name}
                        </p>
                        <p className="text-gray-700">
                            <strong>Leader:</strong> {sub.leader.name}
                        </p>
                        <p className="text-gray-700">
                            <strong>Phone:</strong> {sub.leader.phone}
                        </p>
                        <p className="text-gray-700">
                            <strong>Email:</strong> {sub.leader.email}
                        </p>
                    </div>
                ))}
            </div>
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Chorales</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    {community.chorales.map((chorale, idx) => (
                        <li key={idx}>{chorale}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-6">
                <Link
                    to="/catholicAction"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
                >
                    Back to Catholic Action
                </Link>
            </div>
        </div>
    )
}