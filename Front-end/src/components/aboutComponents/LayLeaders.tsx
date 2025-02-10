import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from "../generalComponents/ButtonComponent";

interface LayLeadersProps {
    image: string;
    description: string;
}

export const LayReaders: React.FC<LayLeadersProps> = ({ image, description }) => {
    const navigate = useNavigate();
    const handleButton = () => {
        navigate('/layLeader');
    };

    return (
        <div className="p-4">
            <h2 className="text-custom-blue font-bold text-2xl md:text-4xl my-4 text-center sm:text-left">
                Commission of Lay Leaders
            </h2>
            <div className="flex flex-col sm:flex-row bg-custom-blue p-4 rounded-md shadow-md">
                <div
                    className="w-full sm:w-1/3 h-64 sm:h-80 bg-cover bg-center rounded-md"
                    style={{ backgroundImage: `url(${image})` }}
                />
                <div className="w-full sm:w-2/3 sm:pl-4 mt-4 sm:mt-0 relative">
                    <p className='text-white mb-4 sm:mb-5'>{description}</p>
                    <ButtonComponent onClick={handleButton} text={'Read More'} />
                </div>
            </div>
        </div>
    );
};
