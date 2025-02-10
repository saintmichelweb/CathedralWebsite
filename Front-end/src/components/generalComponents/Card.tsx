interface RecentEventProps {
    id: number,
    title: string;
    description: string;
    image: string;
    isActive: boolean;
}


export const Card: React.FC<RecentEventProps> = ({ id, title, description, image, isActive }) => {
    return (
        <div key={id} className={`relative bg-cover bg-center w-1/3 h-64 rounded-md shadow-lg overflow-hidden ${isActive === true ? 'block' : 'hidden'}`} style={{ backgroundImage: `url(${image})`, width: '300px', height: '280px' }}>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-custom-blue opacity-70 text-customYellow w-3/4 text-center p-2 h-3/4 rounded-md'>
                <h3 className='font-bold text-xl'>{title}</h3>
                <p className='font-thin text-white'>{description}</p>
            </div>
        </div>
    )
}