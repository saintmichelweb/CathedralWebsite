interface ButtonComponentProps {
    onClick: () => void,
    text: string,

}
export const ButtonComponent: React.FC<ButtonComponentProps> = ({ onClick, text }) => {
    return (
        <button className="absolute bottom-0 bg-customYellow p-2 text-white font-bold rounded-md right-1" onClick={onClick}>
            {text}
        </button>
    )
}