import { MissionVisionCard } from "../generalComponents";
import { MissionVisionData } from "../../data/MissionVisionData";

export const MissionVision: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className='text-custom-blue font-bold text-2xl md:text-4xl my-4 text-center sm:text-left'>
                Mission and Vision
            </h2>
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-7">
                {MissionVisionData && MissionVisionData.length > 0 && (
                    <>
                        <MissionVisionCard
                            subtitle={MissionVisionData[0]?.subtitle || "No subtitle available"}
                            description={MissionVisionData[0]?.description || "No description available"}
                        />
                        <MissionVisionCard
                            subtitle={MissionVisionData[1]?.subtitle || "No subtitle available"}
                            description={MissionVisionData[1]?.description || "No description available"}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
