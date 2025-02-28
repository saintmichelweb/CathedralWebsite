interface MissionVisionCardProps {
    subtitle: string;
    description: string;
}

export const MissionVisionCard: React.FC<MissionVisionCardProps> = ({ subtitle, description }) => {
    return (
        <div className="bg-custom-blue p-2 text-center space-y-5 rounded-md shadow-[0px_4px_15px_rgba(0,0,0,0.8)]">
            <h3 className="text-white font-bold text-2xl">{subtitle}</h3>
            <p className="text-white">{description}</p>
        </div>
    );
};
