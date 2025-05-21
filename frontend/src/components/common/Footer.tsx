import { FaGithub, FaChessPawn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="flex justify-center gap-4 py-16">
        <div>
          <a
            href="https://github.com/FickleBoBo/Pollock"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-grayLight"
          >
            <FaGithub size={32} />
          </a>
        </div>
        <div>
          <a
            href="https://www.chess.com/home"
            aria-label="Chess.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-grayLight"
          >
            <FaChessPawn size={32} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
