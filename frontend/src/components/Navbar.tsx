import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="/left_arrow.png"
            alt="back arrow"
            className="w-10 bg-black p-1 rounded-full"
            onClick={() => navigate(-1)}
          />
          <img
            src="/right_arrow.png"
            alt="forward arrow"
            className="w-10 p-1 bg-black rounded-full"
            onClick={() => navigate(+1)}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full hidden md:block">
            Explore Premium
          </p>
          <p className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full hidden md:block">
            Install App
          </p>
          <p className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full">
            Logout
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All Albums
        </p>
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
          Music
        </p>
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
          Podcasts
        </p>
        <p
          className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block"
          onClick={() => navigate("/playlist")}
        >
          PlayList
        </p>
      </div>
    </>
  );
};

export default Navbar;
