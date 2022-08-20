import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './dropdown.sass';
import { getElementOffset, setElementOffset } from '../../utils/appFn';

export function DropDown({ button, children, isOpen, onOpen, onClose, className }) {
  const classes = classNames("listContainer", className);
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);
  const [offset, setOffset] = useState([0, 0]);
  const refMenu = useRef(null);
  const refBtn = useRef(null);

  const node = document.querySelector('#dropdown-root');
  if (!node) return null;

  useEffect(() => setElementOffset(refMenu, offset), [offset]);
  useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  useEffect(() => {
    if (isDropdownOpen && onOpen) {
      onOpen();
    } else if (onClose) {
      onClose();
    }
  }, [isDropdownOpen]);

  const handleOpen = ({ currentTarget }) => {
    if (currentTarget) {
      setOffset(getElementOffset(currentTarget));
    }

    if (!isOpen) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  useEffect(() => {
    function handleClick({ target }) {
      if (
        target instanceof Node
        && !refMenu.current?.contains(target)
        && !refBtn.current?.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="container">
      <button
        type="button"
        className="btn"
        ref={refBtn}
        onClick={handleOpen}
      >
        {button}
      </button>
      {isDropdownOpen && ReactDOM.createPortal(
        (
          <div ref={refMenu} className={classes}>
            <div className="list" onClick={() => setIsDropdownOpen(false)}>
              {children}
            </div>
          </div>
        ),
        node,
      )}
    </div>
  );
}

