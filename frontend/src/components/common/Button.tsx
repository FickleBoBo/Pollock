interface ButtonProps {
  className?: string;
  text: string;
  onClick: () => void;
}

const Button = ({ className, text, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};

export default Button;
