import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Initial from './InitialHome';
import { useSubstrate } from '../../substrate-lib';
import AccountSelector from '../../components/AccountSelector';
import { message, loader } from '../../middlewares/status';
import Auctions from '../AuctionsMarket/AuctionsRender';
import NftMarket from '../NFTMarketRender/NftMarket';
import SideBar from '../../components/SideBarMenu/SideBar';
import './Home.scss';

export default function Home (props) {
  const [accountAddress, setAccountAddress] = useState(null);
  const [infos, setInfos] = useState([]);
  const [carbon, setCarbon] = useState([]);
  const [tree, setTotalTree] = useState([]);
  const [isOnloadNft, setIsOnloadNFt] = useState(false);
  const [nftSale, setNftSale] = useState([]);
  const { apiState, keyringState, apiError, api } = useSubstrate();
  const [renderSelect, setRenderSelect] = useState('');
 
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
    async function getInfos () {
      const myArray = [];
      const myAuction = [];
      try {
        const data = await api.query.tokenNonFungible.nextTokenId();

        const number = await data.toHuman();

        for (let a = 0; a <= number; a += 1) {
          const res = await api.query.tokenNonFungible.tokens(a);
          const resHuman = await res.toHuman();
          myArray.push(resHuman);
        }

        for (let a = 0; a <= number; a += 1) {
          const res = await api.query.nftMarket.auctionsInfo(a);
          const resHuman = await res.toHuman();
          myAuction.push(resHuman);
        }

        const filterAuction = myAuction.filter(function (val) {
          return Boolean(val);
        });

        const filterArr = myArray.filter(function (val) {
          return Boolean(val);
        });

        const numbersCo2 = filterArr.map((val) => {
          let one = '';
          one = one + val.co2_offset_per_year;
          return one;
        });
        const numberCo2 = [];
        for (let b = 0; b < numbersCo2.length; b += 1) {
          const total = +numbersCo2[b].replace(/\D+/g, '');
          numberCo2.push(total);
        }

        const total = numberCo2.reduce(function (total, numero) {
          return total + numero;
        }, 0);

        const numbersTree = filterArr.map((val) => {
          let one = '';
          one = one + val.total_trees;
          return one;
        });
        const treeArr = [];
        for (let b = 0; b < numbersTree.length; b += 1) {
          const total = +numbersTree[b].replace(/\D+/g, '');
          treeArr.push(total);
        }

        const totalTree = treeArr.reduce(function (total, numero) {
          return total + numero;
        }, 0);

        setTotalTree(totalTree);
        setCarbon(total);
        setInfos(filterAuction);
      } catch (e) {
        console.log(e);
      }
    }
    getInfos();
    rendeAuctions();
  }, [accountAddress, renderSelect, setNftSale, api, setTotalTree, setInfos, infos]);
  if (apiState === 'ERROR') return message(apiError);
  else if (apiState !== 'READY') return loader('Connecting to Substrate');

  if (keyringState !== 'READY') {
    return loader(
      'Loading accounts (please review any extensions authorization)'
    );
  }

  return (
    <>
      <div className="text-blueGray-700 antialiased">
        <div>
          <SideBar setRenderSelect={setRenderSelect} />
          <div className="relative md:ml-56 bg-none">
            <nav className=" top-0 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center p-2">
              <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                <form className="md:flex  flex-row flex-wrap items-center lg:ml-auto">
                  <div className=" flex w-full flex-wrap items-end">
                    <Link to="/perfil" className="mx-4 m-auto">
                      Profile
                    </Link>
                    <AccountSelector
                      setAccountAddress={setAccountAddress}
                      className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center  pl-3 py-3"
                    />
                  </div>
                </form>
              </div>
            </nav>
            <div className="relative  bg-green-400 md:pt-32 pb-32 pt-12 flora">
              <div className="px-4 md:px-10 mx-auto w-full mb:mb-20">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                              Current Sales
                            </h5>
                            {isOnloadNft ?
                              <span className="font-semibold text-xl text-blueGray-700">
                                {nftSale.length}
                              </span>
                              : 0
                            }
                          </div>
                          <div className="relative w-auto pl-4 flex-initial ">
                            <div className="text-white p-3 text-center   items-center justify-center -mt-16 w-20 h-20 shadow-lg rounded-lg bg-red-500">
                              <i className="fas fa-2x fa-store" />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">
                          <span className="text-emerald-500 mr-2">
                            <i className="fas fa-arrow-up" /> 0
                          </span>
                          <span className="whitespace-nowrap">
                            Total generated
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4 lg:m">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                              Planted Trees
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700">
                              {tree}
                            </span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3    -mt-16 w-20 h-20 rounded-lg text-center shadow-lg  bg-green-500">
                              <i className="fas fa-2x fa-tree" />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">
                          <span className="text-red-500 mr-2">
                            <i className="fas fa-arrow-up" /> 0
                          </span>
                          <span className="whitespace-nowrap">
                            Total generated
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                              CO2 Slaughter
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700">
                              {carbon}
                            </span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center  items-center justify-center -mt-16 w-20 h-20 shadow-lg rounded-lg bg-green-500">
                              <i className="fas fa-2x fa-globe-americas" />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">
                          <span className="text-orange-500 mr-2">
                            <i className="fas fa-arrow-up" /> 0
                          </span>
                          <span className="whitespace-nowrap">
                            Total generated
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4 ">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg ">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                              Auctions
                            </h5>
                            {infos.length > 0 ?
                              <span className="font-semibold text-xl text-blueGray-700">
                                {infos.length}
                              </span>
                              : <span className="font-semibold text-xl text-blueGray-700">0</span>
                            }
                          </div>
                          <div className="relative w-auto pl-4 flex-initial ">
                            <div className="text-white p-3 text-center  items-center justify-center -mt-16 w-20 h-20 shadow-lg rounded-lg bg-lightBlue-500">
                              <i className="fas fa-2x fa-balance-scale-right " />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">
                          <span className="text-emerald-500 mr-2">
                            <i className="fas fa-arrow-up" /> 0
                          </span>
                          <span className="whitespace-nowrap">
                            Total generated
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {renderSelect === '2' ? <NftMarket /> : ''}
            {renderSelect === '1' ? <Auctions infos={infos} /> : ''}
            {renderSelect !== '1' && renderSelect !== '2' && isOnloadNft ?
              <Initial nftSale={nftSale} infos={infos} />
              : ''
            }
          </div>
        </div>
      </div>
    </>
  );
}
