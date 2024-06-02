/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { approveOrder, getAllOrders } from '../../api/order';

export function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [approvingId, setApprovingId] = useState();

  const getData = async (offset, limit) => {
    try {
      setLoading(true);
      const res = await getAllOrders(offset, limit);

      if (!res.has_error) {
        setOrders(res.data.data.rows);
        setPages(Math.ceil(res.data.data.count / limit));
      }
      setLoading(false);
    } catch (error) {
      console.log('Error caught - getData()', error);
    }
  };

  const onApproveClick = async (id) => {
    try {
      setApprovingId(id);
      const res = await approveOrder(id);

      if (!res.has_error) {
        getData(currentPage, 5);
      }

      setApprovingId(null);
    } catch (error) {
      setApprovingId(null);
      console.log('Error caught - approveOrder()', error);
    }
  };

  const onPageChange = (index) => {
    setCurrentPage(index + 1);
    getData(index + 0, 5);
  };

  useEffect(() => {
    getData(0, 5);
  }, []);

  return (
    <div className="bg-primary h-screen overflow-hidden text-white flex">
      <div className="border-r border-secondary w-fit h-full py-10 px-3 flex flex-col gap-8">
        <button
          type="button"
          className="text-white px-3 py-3 rounded-xl grid place-items-center bg-[rgba(187,247,208,.2)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8.14301 15.857H5.57001V9.43H8.14201V15.858L8.14301 15.857ZM13.286 15.857H10.714V3H13.286V15.857ZM18.428 15.857H15.857V6.857H18.428V15.857Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 20.714H3V18.714H21V20.714Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button
          type="button"
          className="text-white px-3 py-3 rounded-xl grid place-items-center bg-[rgba(187,247,208,.2)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 19V5M19 12H5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="text-white px-3 py-3 rounded-xl grid place-items-center bg-[rgba(187,247,208,.2)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H11C11.2833 3 11.521 3.096 11.713 3.288C11.905 3.48 12.0007 3.71733 12 4C12 4.28333 11.904 4.521 11.712 4.713C11.52 4.905 11.2827 5.00067 11 5H5V19H11C11.2833 19 11.521 19.096 11.713 19.288C11.905 19.48 12.0007 19.7173 12 20C12 20.2833 11.904 20.521 11.712 20.713C11.52 20.905 11.2827 21.0007 11 21H5ZM17.175 13H10C9.71667 13 9.47933 12.904 9.288 12.712C9.09667 12.52 9.00067 12.2827 9 12C9 11.7167 9.096 11.4793 9.288 11.288C9.48 11.0967 9.71733 11.0007 10 11H17.175L15.3 9.125C15.1167 8.94167 15.025 8.71667 15.025 8.45C15.025 8.18333 15.1167 7.95 15.3 7.75C15.4833 7.55 15.7167 7.44567 16 7.437C16.2833 7.42833 16.525 7.52433 16.725 7.725L20.3 11.3C20.5 11.5 20.6 11.7333 20.6 12C20.6 12.2667 20.5 12.5 20.3 12.7L16.725 16.275C16.525 16.475 16.2877 16.571 16.013 16.563C15.7383 16.555 15.5007 16.4507 15.3 16.25C15.1167 16.05 15.0293 15.8127 15.038 15.538C15.0467 15.2633 15.1423 15.034 15.325 14.85L17.175 13Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="p-10 w-full">
        <p className="text-3xl font-semibold">Orders</p>
        <div className="border border-tertial rounded-lg mt-10">
          <div className="border-b border-tertial grid grid-cols-10 font-semibold">
            <p className="border-r border-tertial text-center p-2">
              Date
            </p>
            <p className="border-r border-tertial text-center p-2">
              Customer names
            </p>
            <p className="border-r border-tertial text-center p-2">
              Address
            </p>
            <p className="border-r border-tertial text-center p-2">
              Land size
            </p>
            <p className="border-r border-tertial text-center p-2">
              Fertilizer
            </p>
            <p className="border-r border-tertial text-center p-2">
              Fertilizer amount
            </p>
            <p className="border-r border-tertial text-center p-2">
              Seed
            </p>
            <p className="border-r border-tertial text-center p-2">
              Seeds amount
            </p>
            <p className="border-r border-tertial text-center p-2">
              Payed
            </p>
            <p className="border-r border-tertial text-center p-2">
              Approve
            </p>
          </div>
          {(loading && (
            <div className="h-[300px] grid place-items-center">
              Loading
            </div>
          )) || (
            <>
              {orders &&
                orders.map((order) => (
                  <div className="border-b border-tertial grid grid-cols-10">
                    <p className="border-r border-tertial text-center p-2">
                      {`${new Date(
                        order.createdAt,
                      ).getDay()}/${new Date(
                        order.createdAt,
                      ).getMonth()}/${new Date(
                        order.createdAt,
                      ).getFullYear()}`}
                    </p>
                    <p className="border-r border-tertial text-center p-2">
                      {order.customerNames}
                    </p>
                    <p className="border-r border-tertial text-center p-2">
                      {order.customerAddress}
                    </p>
                    <p className="border-r border-tertial text-center p-2">
                      {order.landSize} Acres
                    </p>
                    <p className="border-r border-tertial text-center p-2">
                      {order.fertilizer.fertilizerName}
                    </p>
                    <p className="border-r border-tertial text-center p-2">
                      {order.totalFertilizerAmount}
                    </p>
                    <p className="border-r border-tertial text-center p-2">
                      {order.seed.seedName}
                    </p>
                    <p className="border-r border-tertial text-center p-2">
                      {order.totalSeedAmount}
                    </p>
                    <p className="border-r border-tertial text-center p-2">
                      {(order.payed && 'Payed') || 'Not payed'}
                    </p>
                    <div className="border-r border-tertial text-center p-2">
                      {(order.approved && 'Approved') || (
                        <button
                          type="button"
                          onClick={() => onApproveClick(order.id)}
                          disabled={approvingId === order.id}
                          className="px-4 py-2 bg-[#16a34a] disabled:bg-[#60f195] rounded-xl"
                        >
                          {(approvingId === order.id &&
                            'Approving') ||
                            'Approve'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
        <div className="grid place-items-center w-full mt-20">
          <div className="flex gap-5">
            <p>Pages</p>
            {Array.from({ length: pages }, (_, index) => (
              <button
                type="button"
                className={`h-6 w-6 rounded-full grid place-items-center ${
                  currentPage === index + 1 && 'bg-[#16a34a]'
                } font-semibold`}
                onClick={() => onPageChange(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
