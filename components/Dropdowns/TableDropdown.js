import React from 'react';
import { createPopper } from '@popperjs/core';

const TableDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.useRef(null);
  const popoverDropdownRef = React.useRef(null);
  const popperInstance = React.useRef(null);

  const openDropdownPopover = () => {
    if (btnDropdownRef.current && popoverDropdownRef.current) {
      // Always destroy previous instance before creating a new one
      if (popperInstance.current) {
        popperInstance.current.destroy();
      }
      popperInstance.current = createPopper(
        btnDropdownRef.current,
        popoverDropdownRef.current,
        { placement: 'bottom-end' } // Use 'bottom-end' or 'bottom-start'
      );
      setDropdownPopoverShow(true);
    }
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
    if (popperInstance.current) {
      popperInstance.current.destroy();
      popperInstance.current = null;
    }
  };

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        popoverDropdownRef.current &&
        !popoverDropdownRef.current.contains(event.target) &&
        btnDropdownRef.current &&
        !btnDropdownRef.current.contains(event.target)
      ) {
        closeDropdownPopover();
      }
    }
    if (dropdownPopoverShow) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownPopoverShow]);

  return (
    <>
      <button
        className="text-blueGray-500 py-1 px-3"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </button>
      <div
        ref={popoverDropdownRef}
        style={{ display: dropdownPopoverShow ? 'block' : 'none' }}
        className={
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <button
          className="text-sm py-2 px-4 font-normal block w-full text-left whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={() => {}}
        >
          Create Ticket
        </button>
        <button
          className="text-sm py-2 px-4 font-normal block w-full text-left whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={() => {}}
        >
          View Alert
        </button>
      </div>
    </>
  );
};

export default TableDropdown;
