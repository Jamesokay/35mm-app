import { FC } from "react";
import Slider from "../components/Slider";

const ResultsLoading: FC<{ title: string }> = ({ title }) => {
  const placeholderArray = Array.from({ length: 10 });
  return (
    <Slider title={title}>
      {placeholderArray.map((_, index) => (
        <div
          key={index}
          className="w-[200px] min-w-[200px] h-[300px] bg-gray-700 rounded-lg animate-pulse"
        ></div>
      ))}
    </Slider>
  );
};

export default ResultsLoading;
