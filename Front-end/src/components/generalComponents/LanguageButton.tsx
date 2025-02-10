interface LanguageButtonProps {
    onClick: () => void,
    imageSrc: string,
    altText: string,
}
export const LanguageButton: React.FC<LanguageButtonProps> = ({ onClick, imageSrc, altText }) => {
    return (
        <button onClick={onClick} className="text-customYellow mx-1">
            <img src={imageSrc} alt={altText} className="h-6" />
        </button>
    )
} 