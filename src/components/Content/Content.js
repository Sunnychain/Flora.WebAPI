import React from 'react';
import { Link } from 'react-router-dom';
import flora from '../../Website/img/imagens-SITE-2.png';
import FemaleFlora from '../../Website/img/mascote-feminina-FLORA.png';
import Flora from '../../images/tree.png';
import Capped from '../../images/min_Flora-black.png';
import ogham from '../../images/OGHAM.png';
import './Content.scss';
export default function Content () {
  return (
  <>
    <div class="w-full bg-center bg-cover h-96" style={{ backgroundImage: `url(${flora})` }}>
      <div class="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
        <div class="text-center">
          <h1 class="text-2xl font-semibold text-white uppercase lg:text-3xl">
            Do you have any questions about our <span class="text-blue-400 underline">project?</span>
         </h1>
          <Link>
            <button class="w-full px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-200 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">About</button>
          </Link>
        </div>
      </div>
    </div>
    <div >
    <section class="text-blueGray-700 bg-white ">
      <div class="container flex flex-col items-center px-5 py-16 mx-auto md:flex-row lg:px-28">
          <div class="flex flex-col items-start mb-16 text-left lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:mb-0">
              <h2 class="mb-8 text-xs font-semibold tracking-widest text-black uppercase title-font"> Market NFT </h2>
              <h1 class="mb-8 text-2xl font-black tracking-tighter text-black md:text-5xl title-font"> You can carry out your carbon abatement by purchasing nfts, </h1>
              <p class="mb-8 text-base leading-relaxed text-left text-blueGray-600 ">our nfts represent real trees, each one carrying in their signature their due amounts of contribution per year.</p>
              <div class="flex flex-col justify-center lg:flex-row">
                  <button class="flex items-center px-6 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">
                    <Link to="/market" style={{ color: 'white' }}> Buy NFT </Link>
                  </button>
                  <p class="mt-2 text-sm text-left text-blueGray-600 md:ml-6 md:mt-0"> View <br class="hidden lg:block" />
                  <Link href="#" class="inline-flex items-center font-semibold text-blue-600 md:mb-2 lg:mb-0 hover:text-black " title="read more">
                    NFT Market
                  </Link>
                  </p>
              </div>
          </div>
          <div class="w-full lg:w-1/4 lg:max-w-lg md:w-1/2 ">
              <img class="object-cover object-center rounded-lg " alt="hero" src={FemaleFlora} />
          </div>
      </div>
    </section>

<section class="grid grid-cols-3 container mx-auto gap-4 p-4 bg-white">
  <div class="col-span-2 row-span-2">
    <div class="relative pt-[56.25%] overflow-hidden">
      <iframe class="absolute inset-0 w-full h-full border-0" src="https://www.youtube.com/embed/2DGxm1csQQM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

    <h3 class="mt-2 text-lg truncate uppercase tracking-wider">Flora About</h3>
  </div>

  <div class="relative">
    <div class="relative pt-[56.25%] overflow-hidden">
      <img class="absolute inset-0 w-full h-full object-cover" src={Flora} alt="" />
    </div>
    <h3 class="absolute inset-x-0 bg-white bottom-0 pt-2 text-lg truncate uppercase tracking-wider" style={{ textAlign: 'center' }}>Go to Market</h3>
  </div>

  <div class="relative">
    <div class="relative pt-[56.25%] overflow-hidden">
      <img class="absolute inset-0 w-full h-full object-cover" src={Capped} alt="" />
    </div>
    <h3 class="absolute inset-x-0 bg-white bottom-0 pt-2 text-lg truncate uppercase tracking-wider" style={{ textAlign: 'center' }}>Go TO Auction</h3>
  </div>
</section>
<section class="text-blueGray-700 bg-game">
    <div class="container flex flex-col items-center px-5 py-16 mx-auto md:flex-row lg:px-28">
        <div class="flex flex-col items-start mb-16 text-left lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:mb-0">
            <h2 class="text-2xl font-semibold text-white uppercase lg:text-3xl"> Ogham </h2>
            <h1 class="mb-8 text-2xl tracking-tighter  md:text-5xl title-font">
Ogham is a card game, which aims to help the environment, while generating entertainment. </h1>
            <p class="mb-8 text-base leading-relaxed text-left text-blueGray-600 ">the cards used in matches at OGHAM have their rarity defined by the rarity of the planted tree and its contribution to the environment</p>
            <div class="flex flex-col justify-center lg:flex-row">
                <button class="flex items-center px-6 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">
                  <Link to="http://localhost:8069/OghamWeb.html" style={{ color: 'white' }}> Play Game </Link>
                </button>
                <p class="mt-2 text-sm text-left text-blueGray-600 md:ml-6 md:mt-0"> View <br class="hidden lg:block" />
                <Link href="#" class="inline-flex items-center font-semibold text-blue-600 md:mb-2 lg:mb-0 hover:text-black " title="read more">
                 OGHAM
                </Link>
                </p>
            </div>
        </div>
        <div class="w-full lg:w-1/2 lg:max-w-lg md:w-1/2 ">
            <img class="object-cover object-center rounded-lg " alt="hero" src={ogham} />
        </div>
    </div>
</section>
</div>
  </>
  );
}
