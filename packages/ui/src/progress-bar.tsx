const ProgressBar = ({ progress = 0 }: { progress?: number }) => {
  return (
    <div className="relative h-6 py-1.5">
      <div className="absolute bottom-0 left-0 top-0 h-full w-full bg-gray-400"></div>
      <div
        style={{
          width: `${progress}%`,
        }}
        className="absolute bottom-0 left-0 top-0 h-full bg-gray-600 transition-all duration-150"
      ></div>
      <div className="absolute bottom-0 left-0 top-0 flex h-full w-full items-center justify-center">
        <span className="text-xs font-bold text-white">{progress}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
