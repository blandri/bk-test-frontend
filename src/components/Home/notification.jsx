import React from 'react';

export function NotificationBox({ show, setShow, type }) {
  return (
    <div className="font-semibold absolute top-5 right-5 flex gap-4 border border-[#ef4444] min-w-[250px] max-w-[300px] py-2 px-4 rounded-2xl">
      <div className="absolute right-2 w-5 h-5 rounded-full bg-[#fecaca] grid place-items-center cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[12px] h-[12px] text-[#ef4444]"
          viewBox="0 0 256 256"
          fill="none"
        >
          <path
            d="M205.66 194.34C206.403 195.083 206.993 195.966 207.395 196.937C207.797 197.908 208.004 198.949 208.004 200C208.004 201.051 207.797 202.092 207.395 203.063C206.993 204.034 206.403 204.917 205.66 205.66C204.917 206.403 204.034 206.993 203.063 207.395C202.092 207.797 201.051 208.004 200 208.004C198.949 208.004 197.908 207.797 196.937 207.395C195.966 206.993 195.083 206.403 194.34 205.66L128 139.31L61.66 205.66C60.1589 207.161 58.1229 208.004 56 208.004C53.8771 208.004 51.8411 207.161 50.34 205.66C48.8389 204.159 47.9956 202.123 47.9956 200C47.9956 197.877 48.8389 195.841 50.34 194.34L116.69 128L50.34 61.66C48.8389 60.1589 47.9956 58.1229 47.9956 56C47.9956 53.8771 48.8389 51.8411 50.34 50.34C51.8411 48.8389 53.8771 47.9956 56 47.9956C58.1229 47.9956 60.1589 48.8389 61.66 50.34L128 116.69L194.34 50.34C195.841 48.8389 197.877 47.9956 200 47.9956C202.123 47.9956 204.159 48.8389 205.66 50.34C207.161 51.8411 208.004 53.8771 208.004 56C208.004 58.1229 207.161 60.1589 205.66 61.66L139.31 128L205.66 194.34Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="flex items-center gap-3 pt-5">
        <div>
          <div className="w-6 h-6 rounded-full bg-[#84cc16] grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-white w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z"
                fill="currentColor"
              />
            </svg>
          </div>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-[#ef4444]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.73 3H8.27L3 8.27V15.73L8.27 21H15.73L21 15.73V8.27L15.73 3ZM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5H14.9L19 9.1V14.9Z"
              fill="currentColor"
            />
            <path
              d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
              fill="currentColor"
            />
            <path d="M11 7H13V14H11V7Z" fill="currentColor" />
          </svg> */}
        </div>
        <p>Therrrrrrrrrr</p>
      </div>
    </div>
  );
}
