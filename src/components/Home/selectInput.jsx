/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

export function SelectInput({ type, rows, field, error, setValue }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState('Select');

  const onItemClick = (data) => {
    if (type === 'fertilizer') {
      setValue('fertilizer', data.id, { shouldValidate: true });
      setSelection(data.name);
      setOpen(false);
    }

    if (type === 'seed') {
      setValue('seed', data.id, { shouldValidate: true });
      setSelection(data.name);
      setOpen(false);
    }
  };

  return (
    <div className="grid relative">
      <label className="text-white mb-2 text-lg">
        {(type === 'fertilizer' && 'Select fertilizer') ||
          'Select seed'}
      </label>
      <input
        {...field}
        type="text"
        onClick={() => setOpen(!open)}
        value={selection}
        className={`rounded-lg bg-tertial p-2 border-2 ${
          (error && 'border-[#ef4444]') ||
          'border-transparent focus:border-[#16a34a]'
        }`}
      />
      {open && (
        <div className="absolute z-10 top-[105%] w-full h-[150px] overflow-auto scrollbar-w7 bg-secondary border-2 border-tertial rounded-lg">
          {(rows &&
            rows.map((row) => (
              <p
                onClick={() => {
                  if (type === 'seed') {
                    onItemClick({ name: row.seedName, id: row.id });
                  } else {
                    onItemClick({
                      name: row.fertilizerName,
                      id: row.id,
                    });
                  }
                }}
                className="hover:bg-tertial p-3 rounded-lg cursor-pointer"
              >
                {row.seedName || row.fertilizerName}
              </p>
            ))) || (
            <div className="h-full w-full grid place-items-center">
              <p>No fetched data, please refresh!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
