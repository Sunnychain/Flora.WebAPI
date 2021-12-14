import React from 'react';
import { Link } from 'react-router-dom';
function SideBar (props) {
  const { setRenderSelect } = props;
  const handleClick = (e) => {
    setRenderSelect(e.target.id);
  };
  return (
    <>
       <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-gray-200 flex flex-wrap items-center justify-between relative md:w-auto z-10 py-4 px-2">
            <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center   mx-auto text">
              <ul className="mt-12 ">
                <li className="flex w-full justify-between text-white hover:bg-green-300  cursor-pointer items-center py-3 px-8 " id="0" onClick={handleClick}>
                  <Link
                    to="#"
                    className="flex items-center  rounded focus:outline-none focus:ring-2 focus:ring-green-800"
                    onClick={handleClick}
                    id="0"
                  >
                    <i className="fas fa-2x fa-home" />
                    <span className="text-sm ml-2" id="0" onClick={handleClick}>
                      Home
                    </span>
                  </Link>
                </li>
                <li className="flex w-full justify-between text-gray-200 hover:text-white hover:bg-green-300 cursor-pointer items-center px-8 py-3" id="2" onClick={handleClick}>
                  <Link
                    to="#"
                    className="flex items-center  rounded focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={handleClick}
                    id="2"
                  >
                    <i className="fas fa-2x fa-store" id="2" onClick={handleClick}/>
                    <span className="text-sm ml-2" id="2" onClick={handleClick}>
                      Market
                    </span>
                  </Link>
                </li>
                <li className="flex w-full justify-between text-gray-200 hover:text-white hover:bg-green-300 cursor-pointer items-center px-8 py-3" id="1" onClick={handleClick}>
                  <Link
                    to="#"
                    className="flex items-center  rounded focus:outline-none focus:ring-2 focus:ring-white"
                    id="1"
                    onClick={handleClick}
                  >
                    <i className="fas fa-2x fa-gavel" id="1" onClick={handleClick} />
                    <span className="text-sm ml-2" id="1" onClick={handleClick}>
                      Auctions
                    </span>
                  </Link>
                </li>
                <li className="flex w-full justify-between text-gray-200 hover:text-white hover:bg-green-300 cursor-pointer items-center px-8 py-3">
                  <Link
                    to="/quests"
                    className="flex items-center  rounded focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <i className="fas fa-2x fa-chalkboard-teacher"></i>
                    <span className="text-sm ml-2">Tutorial</span>
                  </Link>
                </li>
                <li className="flex w-full justify-between text-gray-200 hover:text-white hover:bg-green-300 cursor-pointer items-center px-8 py-3">
                  <Link
                    to="#"
                    className="flex items-center rounded focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <i className="fas fa-2x fa-camera-retro"></i>
                    <span className="text-sm ml-2">Gallery</span>
                  </Link>
                </li>
                <li className="flex w-full justify-between text-gray-200 hover:text-white hover:bg-green-300 cursor-pointer items-center px-8 py-3">
                  <Link
                    to="#"
                    className="flex items-center  rounded focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <i className="fab fa-2x fa-leanpub"></i>
                    <span className="text-sm ml-2">About</span>
                  </Link>
                </li>
                <li className="flex w-full justify-between text-gray-200 hover:text-white hover:bg-green-300 cursor-pointer items-center px-8 py-3">
                  <Link
                    to="#"
                    className="flex items-center  rounded focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <i className="fas fa-2x fa-cog"></i>
                    <span className="text-sm ml-2">Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
    </>
  );
}

export default SideBar;
