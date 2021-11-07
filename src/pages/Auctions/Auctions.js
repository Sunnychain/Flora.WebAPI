import React, { useState } from 'react';
import RenderAuctions from './RenderAuctions';
import { Link } from 'react-router-dom';
import { useSubstrate } from '../../substrate-lib';
import AccountSelector from '../../components/AccountSelector';
import { message, loader } from '../../middlewares/status';
import 'tailwindcss/tailwind.css';
export default function Auctions () {
  const [accountAddress, setAccountAddress] = useState(null);
  const { apiState, keyringState, apiError } = useSubstrate();
  if (apiState === 'ERROR') return message(apiError);
  else if (apiState !== 'READY') return loader('Connecting to Substrate');

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    );
  }
  return (
    <>
        <div className="flex w-full mt-3 justify-end items-center">
    {
    accountAddress !== ''
      ? <Link to="/profile" className="mr-2">Profile</Link>
      : ''
    }
    <AccountSelector setAccountAddress={setAccountAddress}/>
    </div>
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <main className="relative z-0 flex-1 pb-8 px-6 bg-white">
          <div className="grid pb-10  mt-4 ">
            <div className="mb-2">
              <p className="text-lg font-semibold text-gray-400">Auctions</p>
            </div>
            <div className="grid grid-cols-12 gap-6 border-b-2 pb-5">
              <div className="col-span-12 sm:col-span-12 md:col-span-8 lg:col-span-8 xxl:col-span-8">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 mt-3">
                  <div className="p-4">
                    <p className="text-xl font-bold">Current</p>
                    <p className="text-xs font-semibold text-gray-400">
                      ongoing auctions{' '}
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="text-xl font-bold">0</p>
                    <p className="text-xs font-semibold text-gray-400">
                      Total Offer
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="text-xl font-bold">0 :P/YEAR</p>
                    <p className="text-xs font-semibold text-gray-400">
                      Co2 slaughtered
                    </p>
                  </div>
                  <div className=" p-4">
                    <p className="text-xl font-bold">0</p>
                    <p className="text-xs font-semibold text-gray-400">
                      Total Tree
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-4 xxl:col-span-4">
                <div className="p-4">
                  <p className="text-sm text-gray-400">average duration</p>
                  <div className="shadow w-full bg-gray-100 mt-2">
                    <div
                      className="bg-indigo-600 text-xs leading-none py-1 text-center text-white"
                      style={{ width: '55%' }}
                    />
                  </div>
                  <p className="text-xs font-semibold text-gray-400 mt-2">
                    5 Minutes
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mt-3">
              <div
                className="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out"
                style={{
                  backgroundImage:
                    'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f868ecef-4b4a-4ddf-8239-83b2568b3a6b/de7hhu3-3eae646a-9b2e-4e42-84a4-532bff43f397.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y4NjhlY2VmLTRiNGEtNGRkZi04MjM5LTgzYjI1NjhiM2E2YlwvZGU3aGh1My0zZWFlNjQ2YS05YjJlLTRlNDItODRhNC01MzJiZmY0M2YzOTcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.R0h-BS0osJSrsb1iws4-KE43bUXHMFvu5PvNfoaoi8o")'
                }}
              >
                <div className="absolute inset-0 bg-pink-900 bg-opacity-75 transition duration-300 ease-in-out" />
                <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">
                  <div>
                    <h3 className="text-center text-white text-lg">
                      Total Auctions
                    </h3>
                    <h3 className="text-center text-white text-3xl mt-2 font-bold">
                      0
                    </h3>
                    <div className="flex space-x-4 mt-4">
                      <Link to="/perfil">
                        <button
                          className="block uppercase mx-10 shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline
                                   focus:outline-none text-white text-xs py-3 px-4 rounded font-bold"
                        >
                          Create Auction
                        </button>
                      </Link>
                      <Link to="/">
                      <button
                        className="block uppercase mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline
                                   focus:outline-none text-white text-xs py-3 px-4 rounded font-bold"
                      >
                        About
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out"
                style={{
                  backgroundImage:
                    'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f868ecef-4b4a-4ddf-8239-83b2568b3a6b/de7hhu3-3eae646a-9b2e-4e42-84a4-532bff43f397.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y4NjhlY2VmLTRiNGEtNGRkZi04MjM5LTgzYjI1NjhiM2E2YlwvZGU3aGh1My0zZWFlNjQ2YS05YjJlLTRlNDItODRhNC01MzJiZmY0M2YzOTcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.R0h-BS0osJSrsb1iws4-KE43bUXHMFvu5PvNfoaoi8o")'
                }}
              >
                <div className="absolute inset-0 bg-yellow-600 bg-opacity-75 transition duration-300 ease-in-out" />
                <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center">
                  <div>
                    <div className="text-white text-lg flex space-x-2 items-center">
                      <div className="bg-white rounded-md p-2 flex items-center">
                        <i className="fas fa-toggle-off fa-sm text-yellow-300" />
                      </div>
                      <p>Current Block</p>
                    </div>
                    <h3 className="text-white text-3xl mt-2 font-bold">0</h3>
                    <h3 className="text-white text-lg mt-2 text-yellow-100 ">
                      block Details
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out"
                style={{
                  backgroundImage:
                    'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f868ecef-4b4a-4ddf-8239-83b2568b3a6b/de7hhu3-3eae646a-9b2e-4e42-84a4-532bff43f397.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y4NjhlY2VmLTRiNGEtNGRkZi04MjM5LTgzYjI1NjhiM2E2YlwvZGU3aGh1My0zZWFlNjQ2YS05YjJlLTRlNDItODRhNC01MzJiZmY0M2YzOTcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.R0h-BS0osJSrsb1iws4-KE43bUXHMFvu5PvNfoaoi8o")'
                }}
              >
                <div className="absolute inset-0 bg-blue-900 bg-opacity-75 transition duration-300 ease-in-out" />
                <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center">
                  <div>
                    <div className="text-white text-lg flex space-x-2 items-center">
                      <div className="bg-white rounded-md p-2 flex items-center">
                        <i className="fas fa-clipboard-check fa-sm text-blue-800" />
                      </div>
                      <p>Total Offer</p>
                    </div>
                    <h3 className="text-white text-3xl mt-2 font-bold">0</h3>
                    <h3 className="text-white text-lg mt-2 ">
                      total number{' '}
                      <span className="font-semibold text-blue-200">
                        collected
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap w-full mb-8">
            <div class="w-full mb-6 lg:mb-0">
              <h1 class="sm:text-4xl text-5xl font-bold font-medium title-font mb-2 text-gray-900">
                Current Auctions
              </h1>
              <div class="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>
          {accountAddress ? <RenderAuctions /> : <h1>No Account</h1>}
        </div>
      </section>
    </>
  );
}
