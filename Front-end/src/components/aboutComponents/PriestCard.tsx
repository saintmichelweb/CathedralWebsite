interface Priest {
    title:string,
    name: string;
    image: string;
    description: string;
}

export const PriestCard: React.FC<Priest> = ({ title,name, image, description }) => {
    return (
        <div className="bg-blue-900 text-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center mb-6">
            <img
                src={image}
                alt={name}
                className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-md mb-4 md:mb-0 md:mr-6"
            />
            <div className="text-center md:text-left">
            <h1 className="m-2 p-1 bg-yellow-500 text-white font-semibold rounded-lg text-center shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out">
            {title}
            </h1>

                <h2 className="text-2xl font-bold mb-2">{name}</h2>
                <p className="text-sm leading-relaxed">
                    {description}
                </p>
                <button className="mt-4 px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600">
                    Read More
                </button>
            </div>
        </div>
    );
};
