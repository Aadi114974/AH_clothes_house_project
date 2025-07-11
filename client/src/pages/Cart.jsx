import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length === 0 || !cartItems) {
      setCartData([]);
      return;
    }

    const tempData = [];

    Object.entries(cartItems).forEach(([productId, sizeMap]) => {
      Object.entries(sizeMap).forEach(([size, qty]) => {
        if (qty > 0) {
          tempData.push({ _id: productId, size, quantity: qty });
        }
      });
    });

    setCartData(tempData);
  }, [cartItems, products]);

  if (cartData.length === 0) {
    return (
      <div className='border-t pt-14 text-center'>
        <Title text1='YOUR' text2='CART' />
        <p className='mt-10 text-gray-600'>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1='YOUR' text2='CART' />
      </div>

      {cartData.map((item, idx) => {
        const product = products.find(p => p._id === item._id);
        if (!product) return null; // product was removed or not yet loaded

        return (
          <div key={idx} className='py-4 border-y text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
            <div className='flex items-start gap-6'>
              <img
                className='w-16 sm:w-20'
                src={product.image?.[0] || assets.placeholder}
                alt={product.name}
              />
              <div>
                <p className='text-xs sm:text-lg font-medium'>
                  {product.name || 'Unnamed Product'}
                </p>
                <div className='flex items-center gap-5 mt-2'>
                  <p>{currency}{product.price?.toFixed?.(2)}</p>
                  <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                </div>
              </div>
            </div>

            <input
              type="number"
              min={1}
              className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
              value={item.quantity}
              onChange={e => {
                const val = Number(e.target.value);
                if (val >= 1) updateQuantity(item._id, item.size, val);
              }}
            />

            <img
              onClick={() => updateQuantity(item._id, item.size, 0)}
              className='w-4 mr-4 sm:w-5 cursor-pointer'
              src={assets.bin_icon}
              alt="Remove"
            />
          </div>
        );
      })}

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className='bg-black text-white text-sm my-8 px-8 py-3'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
