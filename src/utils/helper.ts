import moment from 'moment';

export const insertIf = <T>(condition?: any, ...elements: T[]) =>
  condition ? elements : [];

export const getAircraftDate = (segments, key) => {
  if (key == 'from') {
    return segments[0].departing_at;
  } else {
    return segments[segments.length - 1].arriving_at;
  }
};
export const getDuration = (start, end) => {
  const d1 = moment(new Date(start));
  const d2 = moment(new Date(end));
  const difference = d2.diff(d1, 'minutes');
  const hours = Math.trunc(difference / 60);
  const minutes = difference - hours * 60;
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
};
export const getStops = (segment: any, showAirportName?: boolean) => {
  let stops = [];
  if (segment?.length > 1) {
    for (let i = 0; i < segment.length - 1; i++) {
      const stopDuration = getDuration(
        segment[i].departing_at,
        segment[i + 1].departing_at,
      );

      stops.push({
        [i]: `${stopDuration} ${
          showAirportName
            ? `${segment[i + 1].origin.name}(${
                segment[i + 1].origin.iata_code
              })`
            : segment[i + 1].origin.iata_code
        } `,
      });
    }
  }
  return {
    stopLength: stops.length,
    stops,
  };
};
export const timeOutFunc = () => {
  setTimeout(() => {}, 1000);
};

export const sortOffer = (data, key) => {
  if (key == 'least-expensive') {
    return data.sort((a, b) =>
      Number(a.total_amount) < Number(b.total_amount) ? -1 : 1,
    );
  }
  if (key == 'most-expensive') {
    return data.sort((a, b) =>
      Number(a.total_amount) < Number(b.total_amount) ? 1 : -1,
    );
  }
  return data;
};

export const filterOffers = (data, sortkey, filterKey) => {
  let sortedData = sortOffer(data, sortkey);
  let tempArray = [];
  if (filterKey == 'direct') {
    tempArray = sortedData.filter(
      (item) => getStops(item.slices[0].segments).stopLength < 1,
    );
    console.log('tempArray', tempArray);
  } else if (filterKey == 'one-stop') {
    tempArray = sortedData.filter(
      (item) => getStops(item.slices[0].segments).stopLength == 1,
    );
  } else {
    tempArray = sortedData;
  }
  return tempArray;
};
