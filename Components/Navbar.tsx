import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Image from "next/image";

import { AiOutlineMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { Disclosure } from "@headlessui/react";
const Navbar = ({
  key1,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [timeOut, setTimeOut] = useState(false);
  return (
    <div className="bg-black justify-between flex items-center py-1 p-3 sticky z-15 top-0 z-10 w-full shadow-md shadow-gray-300 box-shadow-md">
      <div className=" text-white  flex flex-row items-center">
        <span className="place-content-start">
          <h1 className="mx-3  text-2xl ">Store</h1>
        </span>
        <span className=" rounded item p-2 font-bold flex flex-row items-center text-white">
          <CountdownCircleTimer
            onComplete={() => setTimeOut(true)}
            key={key1}
            isPlaying
            size={70}
            duration={600}
            colors="#eec41b"
          >
            {({ remainingTime }) => {
              const minutes = Math.floor((remainingTime % 3600) / 60);
              const seconds = remainingTime % 60;

              return `${minutes}:${seconds}`;
            }}
          </CountdownCircleTimer>
        </span>
      </div>
      <Disclosure>
        <Disclosure.Button className="absolute right-8 inline-flex items-center peer justify-center rounded-md text-gray-800 hover:bg-gray-900 hover:text-white ">
          <div className="flex flex-row cursor-pointer bg-slate-400  px-4 py-2 rounded-lg item items-center justify-center  place-content-end text-white text-2xl hover:scale-125 shadow-sm shadow-slate-100 box-shadow-md">
            <Image src="/carts.ico" alt="" height={32} width={32} />
            <span className="ml-2">Cart</span>
          </div>
        </Disclosure.Button>
        <Disclosure.Panel>
          <div className="h-max mt-[84px] right-4 shadow-md drop-shadow-xl shadow-gray-500 rounded-lg sideCart absolute top-0 bg-amber-200 p-10 peer-focus:left-0 ">
            <h2 className="font-extrabold text-xl mt-3">Your Cart</h2>
            <ol>
              <li className="font-bold">
                <div className="item flex my-5 items-center">
                  <div className="w-1/3 text-xs">Items</div>
                  <div className="w-1/3 text-xs">Price</div>
                  <div className="w-1/3 text-xs">Quantity</div>
                </div>
              </li>
              {Object.keys(cart).length == 0 && (
                <div className="font-semibold my-4"> Cart is Empty!</div>
              )}
            </ol>
            <ol>
              {Object.keys(cart).map((k) => {
                return (
                  <li key={k}>
                    <div className="item flex my-5 items-center">
                      <div className="text-xs w-1/3">{cart[k].name}</div>
                      <div className="w-1/3 ml-5 text-xs">{cart[k].price}</div>
                      <div className="w-1/3  text-xl flex items-center ">
                        <AiOutlineMinusCircle
                          onClick={() => {
                            removeFromCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].discount
                            );
                          }}
                          className="mx-2 cursor-pointer text-4xl"
                        />
                        <span className="text-sm">{cart[k].qty}</span>
                        <AiFillPlusCircle
                          onClick={() => {
                            addToCart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name,
                              cart[k].discount
                            );
                          }}
                          className="mx-2 cursor-pointer text-4xl"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div>SubTotal: {subTotal}</div>
            <div className="flex flex-row mb-5">
              <button
                onClick={() => {
                  console.log(cart);
                }}
                disabled={Object.keys(cart).length == 0 || timeOut}
                className="disabled:opacity-50 flex mt-16 text-white bg-purple-600 border-0 py-2 px-4 focus:outline-none hover:bg-purple-700 rounded text-sm"
              >
                Checkout
              </button>
              <button
                disabled={Object.keys(cart).length == 0}
                onClick={clearCart}
                className="disabled:opacity-50 flex mt-16 ml-3 text-white bg-purple-600 border-0 py-2 px-4 focus:outline-none hover:bg-purple-700 rounded text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
};

export default Navbar;
