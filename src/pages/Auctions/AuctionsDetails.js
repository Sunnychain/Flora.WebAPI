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
        setLoading(true);
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
    setSendBid(false);
    setLoading(false);
    try {
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
    setSendBid(false);
    if (status.isFinalized) {
      setSendBid(true);
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
      <div class=" flex justify-end mt-10">
        <Link to="/perfil" class="flex mx-10 justify-end">
          Profile
        </Link>
        <Account setAccountAddress={setAccountAddress} />
      </div>
      <div class="flex justify-center items-center ">
        <div class="container mx-auto mt-10 mb-10 lg:mb-40 lg:px-20">
          <div class="relative w-full my-4 lg:w-9/12 mr-auto rounded-2xl shadow-2xl">
            <img
              alt="Card"
              src={flora}
              class="max-w-full rounded-lg shadow-lg"
            />
          </div>

          {isLoading && sendBid
            ? (
                auctionDetails.map((val) => (
              <div
                id="setTime"
                class="relative w-full lg:-mt-96 lg:w-3/6 p-8 ml-auto bg-green-800 rounded-2xl z-50"
              >
                <div class="flex flex-col text-white">
                  <div>
                    <img class="w-80 " src={TOKEN} alt="" />
                  </div>
                  <p class="text-white  px-2">Last bid address: {val.last_bidder === accountSelected ? <h1>You</h1> : val.last_bidder}</p>
                  <p class="text-white px-2 mb-8">
                    Last bid value: {val.current_price}
                  </p>
                  <div class="flex justify-between pl-2">
                    <h3 class="font-bold ">
                      Current Price: {val.current_price}
                    </h3>
                  </div>
                </div>
                <form>
                  <input
                    value={value}
                    onChange={getValue}
                    placeholder="bid value"
                    className="justify-start uppercase my-2   focus:shadow-outline focus:outline-none  py-3 px-4 rounded font-bold "
                  />

                  <button
                    type="button"
                    onClick={bidSend}
                    className="justify-start uppercase my-2 shadow bg-green-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white w rounded font-bold mx-2 w-20 py-3"
                  >
                    Bid
                  </button>
                </form>
              </div>
                ))
              )
            : (
            <div
              id="setTime"
              class="relative w-full lg:-mt-96 lg:w-3/6 p-8 ml-auto bg-green-800 rounded-2xl z-50"
            >
              <div class="flex flex-col text-white">
                <div>
                  <img class="w-80 " src={FEMALE} alt="" />
                </div>
                <p class="text-white  px-2">Bid Status</p>
                <p class="text-white px-2 mb-8"></p>
                <div class="flex justify-between pl-2">
                  <h3 class="font-bold ">{messageToken}</h3>
                </div>
              </div>
            </div>
              )}
        </div>
      </div>

      <div class="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>
          <Link
            to="/auctions"
            class="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
          >
            <img
              class="object-cover object-center w-full h-full rounded-full"
              src={FEMALE}
              alt="Flora"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default AuctionDetails;
