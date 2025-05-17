interface ScoreBarProps {
  scoreCp: number;
  scoreMate?: number;
}

const ScoreBar = ({ scoreCp, scoreMate }: ScoreBarProps) => {
  const whitePercent = scoreMate
    ? scoreMate > 0
      ? 100
      : 0
    : ((Math.max(-400, Math.min(400, scoreCp)) + 400) / 800) * 80 + 10;

  const displayText = scoreMate
    ? `M${Math.abs(scoreMate)}`
    : `${(Math.abs(scoreCp) / 100).toFixed(1)}`;

  return (
    <div className="w-full h-full overflow-hidden relative">
      {/* 흑 점수 바 */}
      <div
        className="absolute top-0 left-0 w-full bg-black transition-all duration-300"
        style={{ height: `${100 - whitePercent}%` }}
      >
        {whitePercent < 50 && (
          <div className="text-center text-sm text-white font-bold mt-1">
            {displayText}
          </div>
        )}
      </div>
      {/* 백 점수 바 */}
      <div
        className="absolute bottom-0 left-0 w-full bg-white transition-all duration-300 flex items-end justify-center"
        style={{ height: `${whitePercent}%` }}
      >
        {whitePercent >= 50 && (
          <div className="text-center text-sm text-black font-bold mb-1">
            {displayText}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreBar;
