import { useEffect, useState } from 'react';
import { DuffelAncillaries } from '@duffel/components';
import { useParams } from 'react-router';
import { getSeatPlanAPI } from '@client/services/searchFlightService';
import Spin from '@client/components/presentational/Spin';
import './SeatSelection.scss';

const SeatSelectionComp = ({
  seatComponentData,
  setSelectedSeatsData,
  offerMeta,
}) => {
  const params: any = useParams();
  const [loading, setLoading] = useState(false);
  const [seatMap, setSeatMap] = useState(null);
  const [passengerData, setPassengerData] = useState([]);
  const { id } = params;
  useEffect(() => {
    const getSeatPlan = async () => {
      try {
        setLoading(true);
        const { data } = await getSeatPlanAPI(id);
        setSeatMap(data?.offer);
        setPassengerData([...seatComponentData.seatPlanArray]);
        setLoading(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'auto',
        });
      } catch (error) {
        setLoading(false);
      }
    };
    getSeatPlan();
  }, [seatComponentData]);

  const onSubmitFn = (values) => {
    try {
      let tempArray = [];
      for (let i = 0; i < values.passengers.length; i++) {
        tempArray.push({
          serviceId: values.services[i]?.id,
          passengerId: values.passengers[i]?.id,
          amount: values.payments[0].amount,
          flightIndex: i,
        });
      }
      setSelectedSeatsData(tempArray);
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <div className="seat-component w-100">
      {loading ? (
        <Spin />
      ) : (
        <div className="seatBox-wrapper">
          <div className="seatBox w-100">
            <DuffelAncillaries
              offer={offerMeta?.data}
              services={['seats']}
              seat_maps={seatMap}
              passengers={passengerData}
              onPayloadReady={onSubmitFn}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelectionComp;
