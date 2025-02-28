import React from "react";
import { Link } from "react-router-dom";

const communities = [
    {
        id: 1,
        name: "St Nicodème",
        language: "Kinyarwanda",
        leader: {
            name: "John Karekezi",
            phone: "+250 788 123 456",
            picture: "https://hesychia.eu/wp-content/uploads/2022/04/Nicodim.650px.05.jpg",
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
            {
                name: "CEB Kicukiro",
                leader: {
                    name: "Alice Mukamana",
                    phone: "+250 788 987 654",
                    email: "alice.mukamana@example.com",
                },
            },
        ],
    },
    {
        id: 2,
        name: "Communauté du Saint-Esprit",
        language: "French",
        leader: {
            name: "Jocelyne Kaneza",
            phone: "+250 788 528 585",
            picture: "https://images.unsplash.com/photo-1577222512383-ed8bb23c0f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvbHklMjBzcGlyaXR8ZW58MHx8MHx8fDA%3D",
        },
        description:
            "The French Community serves members who worship in French, uniting them through prayer, cultural events, and beautiful chorale performances.",
        subcommunities: [
            {
                name: "CEB Saint Pierre",
                leader: {
                    name: "Pierre Hakizimana",
                    phone: "+250 788 765 432",
                    email: "pierre.hakizimana@example.com",
                },
            },
        ],
    },
    {
        id: 3,
        name: "Christ the King Community",
        language: "English",
        leader: {
            name: "Rose Baguna",
            phone: "+250 788 424 208",
            picture: "https://images.squarespace-cdn.com/content/v1/5a7dd5a780bd5e72be22cb63/1521908387393-9UVPEXCSKNA9QICLDQDQ/Christ-the-King.jpg",
        },
        description:
            "The English Community caters to English-speaking members, fostering unity through worship, subcommunities, and a shared mission.",
        subcommunities: [
            {
                name: "CEB St. Patrick",
                leader: {
                    name: "Patricia Kamanzi",
                    phone: "+250 788 567 890",
                    email: "patricia.kamanzi@example.com",
                },
            },
        ],
        
    },
    {
        id: 1,
        name: "St Nicodème",
        language: "Kinyarwanda",
        leader: {
            name: "John Karekezi",
            phone: "+250 788 123 456",
            picture: "https://hesychia.eu/wp-content/uploads/2022/04/Nicodim.650px.05.jpg",
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
            {
                name: "CEB Kicukiro",
                leader: {
                    name: "Alice Mukamana",
                    phone: "+250 788 987 654",
                    email: "alice.mukamana@example.com",
                },
            },
        ],
    },

    {
        id: 1,
        name: "St Nicodème",
        language: "Kinyarwanda",
        leader: {
            name: "John Karekezi",
            phone: "+250 788 123 456",
            picture: "https://hesychia.eu/wp-content/uploads/2022/04/Nicodim.650px.05.jpg",
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
            {
                name: "CEB Kicukiro",
                leader: {
                    name: "Alice Mukamana",
                    phone: "+250 788 987 654",
                    email: "alice.mukamana@example.com",
                },
            },
        ],
    },

    {
        id: 1,
        name: "St Nicodème",
        language: "Kinyarwanda",
        leader: {
            name: "John Karekezi",
            phone: "+250 788 123 456",
            picture: "https://hesychia.eu/wp-content/uploads/2022/04/Nicodim.650px.05.jpg",
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
            {
                name: "CEB Kicukiro",
                leader: {
                    name: "Alice Mukamana",
                    phone: "+250 788 987 654",
                    email: "alice.mukamana@example.com",
                },
            },
        ],
    },

    {
        id: 1,
        name: "St Nicodème",
        language: "Kinyarwanda",
        leader: {
            name: "John Karekezi",
            phone: "+250 788 123 456",
            picture: "https://hesychia.eu/wp-content/uploads/2022/04/Nicodim.650px.05.jpg",
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
            {
                name: "CEB Kicukiro",
                leader: {
                    name: "Alice Mukamana",
                    phone: "+250 788 987 654",
                    email: "alice.mukamana@example.com",
                },
            },
        ],
    },


    {
        id: 1,
        name: "St Nicodème",
        language: "Kinyarwanda",
        leader: {
            name: "John Karekezi",
            phone: "+250 788 123 456",
            picture: "https://hesychia.eu/wp-content/uploads/2022/04/Nicodim.650px.05.jpg",
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
            {
                name: "CEB Kicukiro",
                leader: {
                    name: "Alice Mukamana",
                    phone: "+250 788 987 654",
                    email: "alice.mukamana@example.com",
                },
            },
        ],
    },

    {
        id: 1,
        name: "St Nicodème",
        language: "Kinyarwanda",
        leader: {
            name: "John Karekezi",
            phone: "+250 788 123 456",
            picture: "https://hesychia.eu/wp-content/uploads/2022/04/Nicodim.650px.05.jpg",
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
            {
                name: "CEB Kicukiro",
                leader: {
                    name: "Alice Mukamana",
                    phone: "+250 788 987 654",
                    email: "alice.mukamana@example.com",
                },
            },
        ],
    },


    {
        id: 1,
        name: "St Nicodème",
        language: "Kinyarwanda",
        leader: {
            name: "John Karekezi",
            phone: "+250 788 123 456",
            picture: "https://hesychia.eu/wp-content/uploads/2022/04/Nicodim.650px.05.jpg",
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
            {
                name: "CEB Kicukiro",
                leader: {
                    name: "Alice Mukamana",
                    phone: "+250 788 987 654",
                    email: "alice.mukamana@example.com",
                },
            },
        ],
    },

    {
        id: 1,
        name: "St Nicodème",
        language: "Kinyarwanda",
        leader: {
            name: "John Karekezi",
            phone: "+250 788 123 456",
            picture: "https://hesychia.eu/wp-content/uploads/2022/04/Nicodim.650px.05.jpg",
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
            {
                name: "CEB Kicukiro",
                leader: {
                    name: "Alice Mukamana",
                    phone: "+250 788 987 654",
                    email: "alice.mukamana@example.com",
                },
            },
        ],
    },

    {
        id: 1,
        name: "St Nicodème",
        language: "Kinyarwanda",
        leader: {
            name: "John Karekezi",
            phone: "+250 788 123 456",
            picture: "https://hesychia.eu/wp-content/uploads/2022/04/Nicodim.650px.05.jpg",
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
            {
                name: "CEB Kicukiro",
                leader: {
                    name: "Alice Mukamana",
                    phone: "+250 788 987 654",
                    email: "alice.mukamana@example.com",
                },
            },
        ],
    },

    {
        id: 1,
        name: "St Nicodème",
        language: "Kinyarwanda",
        leader: {
            name: "John Karekezi",
            phone: "+250 788 123 456",
            picture: "https://hesychia.eu/wp-content/uploads/2022/04/Nicodim.650px.05.jpg",
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
            {
                name: "CEB Kicukiro",
                leader: {
                    name: "Alice Mukamana",
                    phone: "+250 788 987 654",
                    email: "alice.mukamana@example.com",
                },
            },
        ],
    },

    {
        id: 1,
        name: "St Nicodème",
        language: "Kinyarwanda",
        leader: {
            name: "John Karekezi",
            phone: "+250 788 123 456",
            picture: "https://hesychia.eu/wp-content/uploads/2022/04/Nicodim.650px.05.jpg",
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
            {
                name: "CEB Kicukiro",
                leader: {
                    name: "Alice Mukamana",
                    phone: "+250 788 987 654",
                    email: "alice.mukamana@example.com",
                },
            },
        ],
    },

    {
        id: 1,
        name: "St Nicodème",
        language: "Kinyarwanda",
        leader: {
            name: "John Karekezi",
            phone: "+250 788 123 456",
            picture: "https://hesychia.eu/wp-content/uploads/2022/04/Nicodim.650px.05.jpg",
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
            {
                name: "CEB Kicukiro",
                leader: {
                    name: "Alice Mukamana",
                    phone: "+250 788 987 654",
                    email: "alice.mukamana@example.com",
                },
            },
        ],
    },
    
];

export const CatholicActions: React.FC = () => {
    return (
        <div className="w-full p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Parish Community</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {communities.map((community) => (
                    <div
                        key={community.id}
                        className="bg-white shadow-md rounded-lg border border-gray-200 p-4"
                    >
                        <img
                            src={community.leader.picture}
                            alt={`${community.name} leader`}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">
                            {community.name}
                        </h2>
                        <p className="text-gray-700 mb-2">
                            <strong>Language:</strong> {community.language}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Leader:</strong> {community.leader.name}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Phone:</strong> {community.leader.phone}
                        </p>
                        <p className="text-gray-700 mb-4">
                            {community.description}
                        </p>
                        <Link
                            to={`/catholicActionDetails/${community.id}`}
                            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
                        >
                            More Info
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
