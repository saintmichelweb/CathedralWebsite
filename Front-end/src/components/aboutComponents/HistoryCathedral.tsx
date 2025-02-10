interface HistoryCathedralProps {
    title: string,
    description: string,
}


export const HistoryCathedral: React.FC<HistoryCathedralProps> = ({ title, description }) => {
    return (
        <div className="p-4 w-full">
            <h2 className='text-custom-blue font-bold text-2xl md:text-4xl my-4'>{title}</h2>
            <div className="bg-custom-blue p-2 rounded-md" >
                <p className="text-white">{description}</p>
            </div>
        </div>
    )
}