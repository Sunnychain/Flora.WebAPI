import React from 'react';
import { Icon } from '@iconify/react';
import NFT from '../../Website/img/simbolo-RMTerra.png';
import { Link } from 'react-router-dom';
function SideBar () {
  return (
    <>
      <nav id='sidebar' className='sidebar-wrapper' >
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800" >
          <div className="fixed flex flex-col top-0 left-0 w-80  right-20 h-full  bg-white">
            <div className="flex items-center justify-center h-14 border-b" style={{ marginTop: '12px' }}>
              <div><Link to="/app"> Flora Network</Link></div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow" >
              <ul className="flex flex-col py-4 space-y-1">
                <li style={{ marginTop: '30px' }}>
                  <Link to="/" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <Icon icon="healthicons:home" width="30" />
                    <span className="ml-2 text-sm tracking-wide truncate">Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/market" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">

                    <img src={NFT} width="30px" alt="token"/>

                    <span className="ml-2 text-sm tracking-wide truncate">NFT Makert</span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/auctions" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <Icon icon="ri:auction-line" width="30" />
                    <span className="ml-2 text-sm tracking-wide truncate">Auctions</span>
                  </Link>
                </li>

                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">About</div>
                  </div>
                </li>
                <li >
                  <Link to="/" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <Icon icon="emojione:film-projector" width="30" />
                    <span className="ml-2 text-sm tracking-wide truncate">What is Flora Network</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <Icon icon="grommet-icons:gallery" width="30" />
                    <span className="ml-2 text-sm tracking-wide truncate">Gallery</span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">15</span>
                  </Link>
                </li>
                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">support flora network</div>
                  </div>
                </li>
                <li>
                  <Link to="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <Icon icon="bx:bx-donate-heart" width="30" />
                    <span className="ml-2 text-sm tracking-wide truncate">Donation</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                    <Icon icon="ps:people-team" width="30" />
                    <span className="ml-2 text-sm tracking-wide truncate">Team</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SideBar;
