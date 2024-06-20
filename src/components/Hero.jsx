import { Logo } from "../assets/index";

const Hero = () => {
  return (
    <header className="flex flex-col w-full justify-center items-center">
      <nav className="w-full mb-10 pt-3 flex items-center">
        <div>
          <img className="w-12 h-12 object-contain" src={Logo} alt="logo" />
        </div>
        <h1 className="font-bold text-3xl">Briefly</h1>
      </nav>
      <h1 className="text-5xl mt-10 font-extrabold leading-[1.15] sm:text-6xl text-center">
        Transform URLs into <br className="max-md:hidden" />
        <span className="text-[#2a65ed]"> Quick Summaries</span>
      </h1>
      <h2 className="mt-5 text-lg text-gray-600 sm:text-xl text-center max-w-2xl">
        Embrace clarity in reading with Briefly, your go-to app for transforming
        lengthy articles into concise and understandable summaries
      </h2>
    </header>
  );
};

export default Hero;
