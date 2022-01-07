import React, { useEffect, useState } from 'react';
import { useSubstrate } from '../../substrate-lib';
import { Link } from 'react-router-dom';

export default function NftMarket() {
  const [isOnloadNft, setIsOnloadNFt] = useState(false);
  const [nftSale, setNftSale] = useState([]);

  const { api } = useSubstrate();
  useEffect(() => {
    const rendeAuctions = async () => {
      try {
        const MyArray = [];
        const number = await api.query.tokenNonFungible.nextTokenId();
        const numberLooop = number.toJSON();
        const dale = parseInt(numberLooop);

        for (let a = 0; a <= dale; a += 1) {
          const nftSale = await api.query.nftMarket.salesInfo(a);
          const nftSaleHuman = nftSale.toHuman();
          MyArray.push(nftSaleHuman);
          MyArray.push();
        }
        const filterArr = MyArray.filter(function (val) {
          return Boolean(val);
        });
        setNftSale(filterArr);
        setIsOnloadNFt(true);
      } catch (e) {
        console.log(e);
      }
    };
    rendeAuctions();
  }, [api, setNftSale]);

  const movePage = (e) => {
    window.location.href = `details/${e.target.id}`;
    console.log(e.target.id);
  };

  return (
    <div className="text-blueGray-700 antialiased">
      <div id="">
        <div>
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <div className="flex flex-wrap mt-4">
              <div className="w-full mb-12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-lg text-blueGray-700">
                          Current Sale
                        </h3>
                        <Link to="/market">Go to Market</Link>
                      </div>
                    </div>
                  </div>
                  <div className="block w-full overflow-x-auto">
                      {
                        isOnloadNft ?
                        <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                        <tr>
                          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                            Tree Name
                          </th>
                          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                            Current Bid
                          </th>
                          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                            Status
                          </th>
                          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                           Owner
                          </th>
                          <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                          {
                           isOnloadNft && nftSale.length > 0 ?
                             nftSale.map((val) => (          
                              <tr>
                              <th onClick={movePage} id={val.nft_id} className="cursor-pointer border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                              <span className="ml-3 font-bold text-blueGray-600">
                                {val.tree_name}
                              </span>
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              ${val.price}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <i className="fas fa-circle text-green-600 mr-2" />
                              Approved
                            </td>
                            <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-lg  p-4">
                             {val.owner}
                            </td>
                            <td className="border-t-0  align-middle border-l-0 border-r-0  p-4">
                              {val.tree_description}
                            </td>
                            </tr>
                             ))
                             : ''
                          }
                         </tbody>
                      </table>
                          : ''
                      }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
