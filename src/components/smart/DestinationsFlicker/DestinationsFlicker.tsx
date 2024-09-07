import HorizontalFliker from '@client/components/HOC/Flicker/Flicker';
import { Card } from 'antd';
import React from 'react';
import './DestinationFlicker.scss';

const DestinationsFlicker = () => {
  const data = [
    {
      name: 'Turkey',
      imageSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqLYwqYeAfvZmQcKStazHhYQp6ghFXgGamhw&usqp=CAU',
    },
    {
      name: 'Turkey',
      imageSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqLYwqYeAfvZmQcKStazHhYQp6ghFXgGamhw&usqp=CAU',
    },
    {
      name: 'Turkey',
      imageSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqLYwqYeAfvZmQcKStazHhYQp6ghFXgGamhw&usqp=CAU',
    },
    {
      name: 'Turkey',
      imageSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqLYwqYeAfvZmQcKStazHhYQp6ghFXgGamhw&usqp=CAU',
    },
    {
      name: 'Turkey',
      imageSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqLYwqYeAfvZmQcKStazHhYQp6ghFXgGamhw&usqp=CAU',
    },
    {
      name: 'Turkey',
      imageSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqLYwqYeAfvZmQcKStazHhYQp6ghFXgGamhw&usqp=CAU',
    },
    {
      name: 'Turkey',
      imageSrc:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqLYwqYeAfvZmQcKStazHhYQp6ghFXgGamhw&usqp=CAU',
    },
  ];
  return (
    <div className="destinations-flicker">
      <HorizontalFliker showNagivation={true} showHeading={true}>
        {data.map((item, index) => {
          return (
            <div key={index}>
              <Card cover={<img src={item.imageSrc} />} className="item-card">
                <Card.Meta title={item.name} />
              </Card>
            </div>
          );
        })}
      </HorizontalFliker>
    </div>
  );
};

export default DestinationsFlicker;
