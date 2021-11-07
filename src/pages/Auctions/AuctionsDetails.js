import React, { useState, useEffect } from 'react';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useSubstrate } from '../../substrate-lib';

import TOKEN from '../../images/style-flr-rem.png';
import { Link } from 'react-router-dom';
import Account from '../../components/AccountSelector';
import { message, loader } from '../../middlewares/status';
import flora from '../../images/tree.png';
import FEMALE from '../../Website/img/mascote-feminina-FLORA.png';
function AuctionDetails (props) {
  const [isLoading, setLoading] = useState(false);
  const [idAuction, setAuctionId] = useState([]);
  const [token, setTokenInfo] = useState([]);
  const [sendBid, setSendBid] = useState(true);
  const [messageToken, setMessage] = useState('');
  const [auctionDetails, setAuctionDetails] = useState({});
  const [value, setValue] = useState('');
  const [accountAddress, setAccountAddress] = useState(null);
  const [accountSelected, setAccountSelected] = useState('');

  const { api, apiState, keyringState, apiError, keyring } = useSubstrate();

  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  useEffect(() => {
    setAccountSelected(accountAddress);
    const tokenId = props.match.params.id;
    setAuctionId(tokenId);
    async function getTokenInfo () {
      const tokenInfo = [];
      try {
        const data = await api.query.tokenNonFungible.tokens(tokenId);
        const res = await data.toHuman();
        tokenInfo.push(res);
        setLoading(true);
      } catch (e) {}

      const filterArr = tokenInfo.filter(function (val) {
        return Boolean(val);
      });
      setTokenInfo(filterArr);
    }
    async function getToken () {
      try {
        const myArray = [];
        setLoading(false);
        const ownerInfoToken = await api.query.nftMarket.auctionsInfo(tokenId);
        const details = await ownerInfoToken.toHuman();
        myArray.push(details);
        const filterArr = myArray.filter(function (val) {
          return Boolean(val);
        });
        setAuctionDetails(filterArr);
        await getTokenInfo();
      } catch (e) {
        console.log(e);
      }
    }

    getToken();
  }, [
    messageToken,
    api,
    accountAddress,
    props.match.params.id,
    accountSelected
  ]);

  async function getToken () {
    setLoading(false);
    try {
      setSendBid(false);
      const myArray = [];
      const ownerInfoToken = await api.query.nftMarket.auctionsInfo(idAuction);
      const details = await ownerInfoToken.toHuman();
      myArray.push(details);
      const filterArr = myArray.filter(function (val) {
        return Boolean(val);
      });
      setAuctionDetails(filterArr);
      setLoading(true);
      setSendBid(true);
    } catch (e) {
      console.log(e);
    }
  }

  const getFromAcct = async () => {
    try {
      const {
        address,
        meta: { source, isInjected }
      } = accountPair;
      let fromAcct;

      // signer is from Polkadot-js browser extension
      if (isInjected) {
        const injected = await web3FromSource(source);
        fromAcct = address;
        api.setSigner(injected.signer);
      } else {
        fromAcct = accountPair;
      }

      return fromAcct;
    } catch (e) {
      console.log(e);
    }
  };

  if (apiState === 'ERROR') return message(apiError);
  else if (apiState !== 'READY') return loader('Connecting to Substrate');

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    );
  }

  function getValue (e) {
    setValue(e.target.value);
  }

  const txResHandler = ({ status }) => {
    if (status.isFinalized) {
      console.log(status.type);
    }
    setMessage(status.type);
  };

  async function bidSend () {
    const fromAcct = await getFromAcct();
    const extrinsic = api.tx.nftMarket.bidAuction(idAuction, value);

    try {
      const gruly = await extrinsic.signAndSend(fromAcct, txResHandler);
      console.log(gruly);
    } catch (e) {
      console.log(e);
    }
    getToken();
  }

  return (
    <>

    <div className="flex w-full mt-3 justify-end items-center">
    {
    accountAddress !== ''
      ? <Link to="/profile" className="mr-2">Profile</Link>
      : ''
    }
    <Account setAccountAddress={setAccountAddress}/>
    </div>

      {isLoading && token.length > 0
        ? (
        <section class="text-gray-600 body-font overflow-hidden">
       <Link to="/auctions" style={{ fontSize: '15px' }}>Return Market</Link>
          <div class="container px-5 py-24 mx-auto">
            <div class="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="flora"
                class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded "
                style={{ border: 'solid 2px' }}
                src={flora}
              />
              <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 class="text-sm title-font text-gray-500 tracking-widest">
                  {token[0].nft_type}
                </h2>
                <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                  {token[0].name}
                </h1>
                <div class="flex mb-4">
                  <span class="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <h2 class="text-gray-600 ml-3 pb-8">
                      number bids: {auctionDetails[0].num_bid}{' '}
                    </h2>
                  </span>
                </div>
                <p class="leading-relaxed">
                  Description: {token[0].tree_description}
                </p>
                <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div class="flex">
                    <span class="mr-5 pt-2">Active</span>
                    <button
                      class="border-2 border-gray-300 rounded-full w-full h-full focus:outline-none"
                      style={{ fontSize: '30px' }}
                    >
                      <b>Current: {auctionDetails[0].current_price}</b>
                    </button>

                  </div>

                </div>
                <p>Last Bidder: {auctionDetails[0].last_bidder === accountSelected ? <h3>You</h3> : <h3>{auctionDetails[0].last_bidder}</h3> }</p>
                {sendBid
                  ? <div class="flex">

                  {
                    auctionDetails[0].owner === accountSelected
                      ? <h2>You cannot place a bid as you are the owner of the auction</h2>
                      : <div>
                           <span class="title-font font-medium text-2xl text-gray-900">
                       <input
                    className="border-2"
                    placeholder="value offer"
                    onChange={getValue}
                  />

                    <button class="w-full mt-2 flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={bidSend}>
                    Send Bid
                  </button>
                  </span>
                    </div>

                  }

                    <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4" >
                    <img src={FEMALE} alt="flora" />
                  </button>

                </div>
                  : <p>Status:{ messageToken }</p>
                  }

              </div>
            </div>
          </div>
        </section>
          )
        : (
            ''
          )}
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
            <div>
                <img class="object-center object-cover h-auto w-full" src={TOKEN} alt="token" />
            </div>
            <div class="text-center py-8 sm:py-6">
                <p class="text-xl text-gray-700 font-bold mb-2"></p>
                <p class="text-base text-gray-400 font-normal"></p>
            </div>
        </div>
        <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
            <div>
                <img class="object-center object-cover h-auto w-full" src={flora} alt="flora" />
            </div>
            <div class="text-center py-8 sm:py-6">
                <p class="text-xl text-gray-700 font-bold mb-2"></p>
                <p class="text-base text-gray-400 font-normal"></p>
            </div>
        </div>
        <div class="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
            <div>
                <img class="object-center object-cover h-auto w-full" src={flora} alt="female" />
            </div>
            <div class="text-center py-8 sm:py-6">
                <p class="text-xl text-gray-700 font-bold mb-2"></p>
                <p class="text-base text-gray-400 font-normal"></p>
            </div>
        </div>
        </div>
    </>
  );
}

export default AuctionDetails;
