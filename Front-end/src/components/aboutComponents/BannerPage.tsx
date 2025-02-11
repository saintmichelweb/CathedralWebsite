
interface BannerPageProps {
    pageTitle: string,
    image: string,
}


export const BannerPage: React.FC<BannerPageProps> = ({ pageTitle, image }) => {
    return (
        <div className='bg-cover bg-center relative' style={{ backgroundImage: `url(${image})`, width: '100%', height: '550px' }}>
            <div className='absolute top-0 left-0  w-full h-full'></div>
            <div className='absolute top-1/2 left-1/2 w-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-custom-blue/50 p-2 rounded-md'>
                <h1 className='text-4xl sm:text-8xl font-bold text-white'>{pageTitle}</h1>
            </div>
        </div>
    )
}