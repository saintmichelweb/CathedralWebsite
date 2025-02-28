// import { MissionVisionCard } from "../generalComponents";
import { MissionVisionProps } from "./MissionVisionProps"; // Import the props interface

// Update MissionVision to accept props
export const MissionVision: React.FC<MissionVisionProps> = ({ title, mission, vision }) => {
  return (
    <div className="p-4">
      <h2 className='text-custom-blue font-bold text-2xl md:text-4xl my-4 text-center sm:text-left'>
        {title}
      </h2>
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-7">
        <div className="bg-custom-blue p-2 text-center space-y-5 rounded-md shadow-[0px_4px_15px_rgba(0,0,0,0.8)]">
          <h3 className='text-white font-bold text-2xl'>Mission</h3>
          <p className="text-white">{mission}</p>
        </div>
        <div className="bg-custom-blue p-2 text-center space-y-5 rounded-md shadow-[0px_4px_15px_rgba(0,0,0,0.8)]">
          <h3 className='text-white font-bold text-2xl'>Vision</h3>
          <p className="text-white">{vision}</p>
        </div>
      </div>
    </div>
  );
};
