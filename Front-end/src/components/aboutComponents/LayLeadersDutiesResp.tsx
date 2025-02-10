interface LayLeadersDutiesRespProp {
    title: string,
    subTitle: string,
    content: string,
}
export const LayLeadersDutiesResp: React.FC<LayLeadersDutiesRespProp> = ({ title, subTitle, content }) => {
    return (
        <div className="p-4">
            <h1 className='text-custom-blue font-bold text-4xl md:text-4xl my-4'>{title}</h1>
            <h3 className='text-custom-blue font-semibold text-sm md:text-2xl my-4'>{subTitle}</h3>
            <div className="bg-custom-blue p-3 text-white"><p>{content}</p></div>
        </div>
    )
}