import { CalendarDays } from "lucide-react"

interface CardStoriesProps {
    id: number,
    image: string,
    title: string,
    shortDescription: string,
    date: string,
}
export const CardStories: React.FC<CardStoriesProps> = ({ image, title, shortDescription, date }) => {
    return (
        <div className="bg-center bg-cover  h-48 text-center" style={{ backgroundImage: `url(${image})` }}>
            <h2 className="text-white text-sm text-center bg-custom-blue opacity-80 p-1">{title}</h2>
            <p className="text-white bg-custom-blue my-8 text-sm mx-5 p-2 opacity-90">{shortDescription}</p>
            <div className="flex text-white mx-5 bg-custom-blue p-1 opacity-80 ">
                <CalendarDays /><span>{date}</span>
            </div>

        </div>
    )
}