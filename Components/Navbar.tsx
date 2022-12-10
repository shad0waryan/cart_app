import { useState, useEffect, MutableRefObject } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useRef } from "react";

import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
const Navbar = ({
  key,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [timeOut, setTimeOut] = useState(false);

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  return (
    <div className="bg-black justify-between flex items-center p-3 sticky  z-10 shadow-md">
      <div className=" text-white item text-2xl flex items-center">
        <h1 className="mx-3">Store</h1>
      </div>
      <div
        onClick={toggleCart}
        className="flex flex-row cursor-pointer bg-slate-700  px-4 py-2 rounded-lg item items-center justify-center  place-content-end text-white text-2xl hover:scale-125 shadow-sm shadow-slate-400"
      >
        <img src="/carts.ico" className="h-8 w-8" />
        <span className=" ml-2">Cart</span>
      </div>
      <div
        ref={ref}
        className="h-[100vh] rounded-lg sideCart absolute top-0 right-0 bg-amber-200 p-10 transform transition-transform translate-x-full"
      >
        <span className="rounded p-2 font-bold flex flex-row items-center">
          <span className="mr-8">Timer:</span>
          <CountdownCircleTimer
            onComplete={() => setTimeOut(true)}
            key={key}
            isPlaying
            size={80}
            duration={600}
            colors="#e0bc2b"
          >
            {({ remainingTime }) => {
              const minutes = Math.floor((remainingTime % 3600) / 60);
              const seconds = remainingTime % 60;

              return `${minutes}:${seconds}`;
            }}
          </CountdownCircleTimer>
        </span>
        <h2 className="font-extrabold text-xl mt-3">Your Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-3 right-4 cursor-pointer text-xl"
        >
          <AiFillCloseCircle />
        </span>
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
                  <div className="w-1/3 text-xs">{cart[k].price}</div>
                  <div className="w-1/3 text-xl flex items-center ">
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
              return (
                <ol>
                  {Object.keys(cart).map((k) => {
                    return (
                      <ol>
                        <li key={k}>
                          <div className="item flex my-5 items-center">
                            <div className="text-xs w-1/3">{cart[k].name}</div>
                            <div className="w-1/3 text-xs">{cart[k].price}</div>
                            <div className="w-1/3 text-xl  ">
                              <span className="text-sm">{cart[k].qty}</span>
                            </div>
                          </div>
                        </li>
                      </ol>
                    );
                  })}
                </ol>
              );
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
    </div>
  );
};

export default Navbar;
