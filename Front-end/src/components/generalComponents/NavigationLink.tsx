import { Link } from "react-router-dom"

interface NavigationLinkProps {
    to: string,
    text: string,
    onClick?: () => void
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({ to, text, onClick }) => {
    return (
        <li className="mx-2 hover:bg-customYellow p-1 hover:text-white text-customYellow rounded-sm">
            <Link to={to} className="font-bold" onClick={onClick}>{text}</Link>
        </li>
    )
}