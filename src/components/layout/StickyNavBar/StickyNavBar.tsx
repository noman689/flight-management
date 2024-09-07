import React, { useState, useEffect } from 'react';
import FlightSearchForm from '@client/components/smart/FlightSearchForm/FlightSearchForm';
import './StickyNavBar.scss'

const StickyNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 600) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {isScrolled && (
        <div
          className="sticky-nav"
        >
          <FlightSearchForm isStickyNav={true} />
        </div>
      )}
    </>
  );
};

export default StickyNavBar;
