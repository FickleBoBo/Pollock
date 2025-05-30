import B from "@/assets/piece/B.svg?react";
import K from "@/assets/piece/K.svg?react";
import N from "@/assets/piece/N.svg?react";
import P from "@/assets/piece/P.svg?react";
import Q from "@/assets/piece/Q.svg?react";
import R from "@/assets/piece/R.svg?react";

interface PieceIconProps {
  color: string;
  piece: string;
}

const PieceIcon = ({ color, piece }: PieceIconProps) => {
  const className = `w-6 h-6 ${
    color === "WHITE"
      ? "text-white stroke-black stroke-[0.5]"
      : "text-black stroke-white stroke-[0.5]"
  }`;

  const pieces: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    B,
    K,
    N,
    P,
    Q,
    R,
  };

  const PieceComponent = pieces[piece.toUpperCase()];

  return (
    <div>
      <PieceComponent className={className} />
    </div>
  );
};

export default PieceIcon;
