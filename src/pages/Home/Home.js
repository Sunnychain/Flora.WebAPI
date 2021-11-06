import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSubstrate } from '../../substrate-lib';
import AccountSelector from '../../components/AccountSelector';
import { message, loader } from '../../middlewares/status';

import NFT from '../../Website/img/simbolo-RMTerra.png';
import FEMALE from '../../Website/img/mascote-feminina-FLORA.png';
import MALE from '../../images/tree.png';
import DONATE from '../../Website/img/maosemente.png';
import PROJECT from '../../images/style-flor-black.png';
import ABOUT from '../../Website/img/Nft MArket Flora.png';

import './Home.scss';
export default function Home (props) {
  const [accountAddress, setAccountAddress] = useState(null);
  const { apiState, keyringState, apiError } = useSubstrate();

  if (apiState === 'ERROR') return message(apiError);
  else if (apiState !== 'READY') return loader('Connecting to Substrate');

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    );
  }
  console.log(accountAddress);

  return (
    <>
      <div className="h-screen w-full flex overflow-hidden select-none">
  <nav className="w-24 flex flex-col items-center bg-white dark:bg-gray-800 py-4 w-40">
    <div className="flex justify-center">
      <img src={NFT} width="30px" alt="token" />
    </div>

    <ul className="mt-2 text-gray-700 capitalize ">
      <li className="mt-3 p-2 text-blue-600 dark:text-black-300 rounded-lg ">
        <Link to="/Market" className="flex flex-col items-center active:bg-green-700 ">
        <img className="h-10 w-30 rounded-full mr-3" src={FEMALE} alt="" />
          <span className="text-xs mt-2 ">Market</span>
        </Link>
      </li>

      <li className="mt-3 p-2 rounded-lg">
        <Link to="/auctions" className="flex flex-col items-center">
        <img className="h-15 w-40 rounded-full mr-3" src={MALE} alt="" />
          <span className="text-xs mt-2">Auctions</span>
        </Link>
      </li>

      <li className="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300 rounded-lg">
        <Link to="#" className="flex flex-col items-center">
        <img className="h-10 w-30 rounded-full mr-3" src={DONATE} alt=""/>
          <span className="text-xs mt-2">Donate</span>
        </Link>
      </li>

      <li className="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300 rounded-lg">
        <Link to="/gallery" className="flex flex-col items-center">
       <img className="h-15 w-40 rounded-full mr-3" src={PROJECT} alt=""/>
          <span className="text-xs mt-2">Galerry</span>
        </Link>
      </li>

      <li className="mt-3 p-2 hover:text-blue-600 dark-hover:text-blue-300 rounded-lg">
        <Link to="/" className="flex flex-col items-center">
         <img className="h-30 w-40 rounded-full mr-3" src={ABOUT} alt=""/>
          <span className="text-xs mt-2">About</span>
        </Link>
      </li>

    </ul>

  </nav>
  <main className="my-10 ml-20 pt-3 pb-2 px-5 flex-3 bg-gray-200 dark:bg-black rounded-l-lg transition duration-500 ease-in-out overflow-y-auto mt-28">
    <div className="flex flex-col capitalize text-3xl">
      <span className="font-semibold">Flora</span>
      <span>Finance</span>
    </div>
    <div className="flex">
      <div className="mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col bg-white dark:bg-gray-600 rounded-lg">
        <h3 className="flex items-center pt-1 pb-1 px-8 text-lg font-semibold capitalize dark:text-gray-300">
          <span>Info</span>
          <button className="ml-2">
            <svg className="h-5 w-5 fill-current" viewBox="0 0 256 512">
              <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
            </svg>
          </button>
        </h3>

        <div>
          <ul className="pt-1 pb-2 px-3 overflow-y-auto">
            <li className="mt-2 ">
              <section className="img-nft ">
              <div className="p-5 flex flex-col justify-between  " href="/market">
              <div className=" h-40 flex items-top justify-between font-semibold ">
                <span>NFT</span>
                <div className="flex items-between ">
                  <svg className="h-5 w-5 fill-current mr-1" viewBox="0 0 24 24">
                    <path d="M14 12l-4-4v3H2v2h8v3m12-4a10 10 0 01-19.54 3h2.13a8 8 0 100-6H2.46A10 10 0 0122 12z"></path>
                  </svg>
                  <Link to="/market">
                    <span>Go To Market</span>
                  </Link>
                </div>
              </div>

              <p className="text-sm font-medium leading-snug  my-3">
                Our nfts represent real trees that contribute to the environment in carbon abatement, these nfts can be used by companies or people who need to contribute to a carbon abatement goal.
              </p>

              <div className="flex justify-between">
                <div className="flex">

                  <img className="h-6 w-6 mr-3" src={NFT} alt="" />
                  <span>
                    <span className="text-blue-500 font-semibold">
                    <Link to="/market">
                      View Market</Link>
                    </span>
                  </span>

                </div>
              </div>
              </div>
              </section>
            </li>
            <li className="mt-3">
            <section className="img-ogham ">
              <div className="p-5 flex flex-col justify-between  " href="/market">
              <div className=" h-40 flex items-top justify-between font-semibold ">
                <span>OGHAM</span>
                <div className="flex items-between ">
                  <svg className="h-5 w-5 fill-current mr-1" viewBox="0 0 24 24">
                    <path d="M14 12l-4-4v3H2v2h8v3m12-4a10 10 0 01-19.54 3h2.13a8 8 0 100-6H2.46A10 10 0 0122 12z"></path>
                  </svg>
                  <Link to="#">
                    <span>Play Game</span>
                  </Link>
                </div>
              </div>

              <p className="text-sm font-medium leading-snug  my-3">
              Ogham is a card game, where each card has its rarity based on trees that have been planted.
              </p>

              <div className="flex justify-between">
                <div className="flex">

                  <img className="h-6 w-6 mr-3" src={NFT} alt="" />
                  <span>
                    <span className="text-blue-500 font-semibold">
                    <Link to="/market">
                      About</Link>
                    </span>
                  </span>

                </div>
              </div>
              </div>
              </section>
            </li>
          </ul>

        </div>
      </div>

      <div className="mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col bg-green-300 rounded-lg text-white">
        <h3 className="flex items-center pt-1 pb-1 px-8 text-lg font-bold capitalize">
          <span>Flora Network</span>
          <button className="ml-2">
            <svg className="h-5 w-5 fill-current" viewBox="0 0 256 512">
              <path
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
                0l-22.6-22.6c-9.4-9.4-9.4-24.6
                0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6
                0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136
                136c9.5 9.4 9.5 24.6.1 34z"
              ></path>
            </svg>
          </button>
        </h3>

        <div className="flex flex-col items-center mt-12">
          <img className="h-30 w-80 rounded-full mr-3" src={FEMALE} alt=" empty schedule" />

          <span className="font-bold mt-8">Auctions</span>

          <span className="text-purple-500">You can bid and track auction status in real time</span>

          <button className="mt-8  rounded-lg py-2 px-4">
            <Link to="/auctions">Go to Auctions</Link>
          </button>
        </div>
      </div>
    </div>
  </main>
  <aside className="w-40 my-1 mr-2 py-4 flex flex-col rounded-r-lg">
    <div className="flex items-center justify-end mr-2">
      <Link to="/perfil" className="relative">
        <span className="mt-4 mr-2 text-gray-600">Profile</span>
      </Link>

      <div className="flex items-center">
        <AccountSelector setAccountAddress={setAccountAddress} style={{ position: 'absolute' }} />

        <button className="ml-1 focus:outline-none"></button>
      </div>
    </div>
  </aside>
</div>

    </>
  );
}
