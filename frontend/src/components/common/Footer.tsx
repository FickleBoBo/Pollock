import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="bg-gray-700 py-8 text-center">
        <a
          href="https://github.com/FickleBoBo/Pollock"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex hover:text-gray-400"
        >
          <FaGithub size={32} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
