import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { formatNumber } from "../../currency";

export default function CartProduct({
  product,
  setProductsCart,
  productsCart,
}) {
  let [isloadingPuls, setIsloadingPuls] = useState(false);
  let [isloading, setIsloading] = useState(false);
  let [productCount, setproductCount] = useState(product.count);

  async function deleteProdectFromCart(productId) {
    let { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    setProductsCart(data);

    toast.success("Product has been removed sucessfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  async function updateProductCount(productId, count) {
    if (count > product.count) {
      setIsloadingPuls(true);
    } else if (count < product.count) {
      setIsloading(true);
    }
    let { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        count: count,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setProductsCart(data);

    setIsloadingPuls(false);
    setIsloading(false);
  }

  useEffect(() => {
    setproductCount(product.count);
  }, [productsCart]);

  return (
    <>
      <tr className="border-b border-gray-300">
        <td className="py-4 ">
          <div className="flex flex-wrap items-center ">
            <img
              className="h-32 w-32 mr-4 "
              src={product.product.imageCover}
              alt={product.product.title}
            />
            <span className="font-semibold text-black dark:text-white">
              {product.product.title}
            </span>
          </div>
        </td>
        <td className=" sm:px-2"><sup className="font-normal text-xs sm:text-base text-black dark:text-white">EGP</sup>{formatNumber(product.price)}</td>
        <td className="py-4">
          <div className="flex items-center">
            <button
              disabled={isloading || product.count === 1 ||isloadingPuls}
              className="border rounded-md py-1 px-1 sm:px-2 sm:mr-2 bg-green-100 hover:text-white hover:bg-main  disabled:cursor-not-allowed disabled:hover:bg-green-100 disabled:hover:text-black dark:text-black "
              onClick={() =>
                updateProductCount(product.product.id, product.count - 1)
              }
            >
              {isloading ? (
                <i className="fa-solid fa-spinner fa-spin text-main"></i>
              ) : (
                "-"
              )}
            </button>
            <input
              onBlur={() =>
                product.count != productCount &&
                updateProductCount(product.product.id, productCount)
              }
              onChange={(e) => setproductCount(e.target.value)}
              type="text"
              className="text-center mx-1 w-8 outline-none dark:text-black"
              maxLength={3}
              min={1}
              value={productCount}
            />
            <button
              disabled={isloadingPuls ||isloading}
              className="border rounded-md py-1 px-1 sm:px-2 sm:ml-2 bg-green-100 hover:text-white hover:bg-main  disabled:cursor-not-allowed disabled:hover:bg-green-100 disabled:hover:text-black  dark:text-black "
              onClick={() =>
                updateProductCount(product.product.id, product.count + 1)
              }
            >
              {isloadingPuls ? (
                <i className="fa-solid fa-spinner fa-spin text-main"></i>
              ) : (
                "+"
              )}
            </button>
          </div>
        </td>
        <td className="pl-1 sm:px-2"><sup className="font-normal text-xs md:text-base text-black dark:text-white">EGP</sup>{formatNumber(product.price * product.count)}</td>
        <td>
          <i
            className="fa-solid fa-trash text-main sm:ml-3"
            role="button"
            onClick={() => deleteProdectFromCart(product.product._id)}
          ></i>
        </td>
      </tr>
      
    </>
  );
}
