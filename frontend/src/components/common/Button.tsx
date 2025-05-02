interface ButtonProps {
  className?: string;
  text: string;
  onClick: () => void;
}

const Button = ({ className, text, onClick }: ButtonProps) => {
  return (
    <div>
      <button onClick={onClick} className={className}>
        {text}
      </button>
    </div>
  );
};

export default Button;
