import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSubstrate } from '../../substrate-lib';
import FEMALE from '../../Website/img/imagens-SITE-5.png';
export default function RenderAuctions () {
  const [auctionsInfo, setAuctionsInfo] = useState([]);
  const [numberSet, setNumberSet] = useState('');
  const [isRender, setRender] = useState(false);
  const { api } = useSubstrate();
  useEffect(() => {
    async function getAuctions () {
      const auctionsNumber = await api.query.tokenNonFungible.nextTokenId();
      const number = await auctionsNumber.toHuman();
      setNumberSet(number.replace(/\D+/g, ''));
      console.log(number);
      setRender(false);
      const total = [];
      try {
        for (let a = 0; a <= number; a += 1) {
          const auctions = await api.query.nftMarket.auctionsInfo(a);
          total.push(await auctions.toHuman());
        }

        const filterArr = total.filter(function (val) {
          return Boolean(val);
        });

        setRender(true);
        return setAuctionsInfo(filterArr);
      } catch (e) {
        console.log(e);
      }
    }
    getAuctions();
  }, [api.query.nftMarket, api.query.tokenNonFungible, numberSet, setNumberSet]);
  return (
    <div class="flex flex-wrap -m-4">
      {isRender
        ? auctionsInfo.map((val) => (
            <div class="lg:w-1/4 p-4 w-1/2">
              <Link class="block relative h-48 rounded overflow-hidden">
                <img
                  alt="flora"
                  class="object-cover object-center w-full h-full block"
                  src={FEMALE}
                />
              </Link>
              <div class="mt-4">
                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Current
                </h3>
                <h2 class="text-gray-900 title-font text-lg font-medium">
                  TokenNonFungible
                </h2>
                <p class="mt-1">Current Price: {val.current_price}</p>
              </div>
              <Link to={`/auctions/${val.nft_id}`}>
                <button
                  id={val.nft_id}
                  className="justify-start uppercase my-2 shadow bg-indigo-800 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white py-3 px-4 rounded font-bold "
                >
                  Open Auction
                </button>
              </Link>
            </div>
        ))
        : ''}
    </div>
  );
}
