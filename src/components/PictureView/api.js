import { useState, useEffect } from 'react';
import axios from 'axios';
import { ROMI_API } from 'utils/constants';

export const useRomiAnalyses = (imgData, plantDataId) => {
  const [onRequest, setOnRequest] = useState(true);
  const [viewOptions, setViewOptions] = useState(undefined);

  useEffect(() => {
    (async () => {
      if (!imgData) return;
      try {
        const {
          data: { results: dataImg },
        } = await axios.get(`${ROMI_API}/analyses/${imgData.id}`);
        const {
          data: { results: dataPlant },
        } = await axios.get(`${ROMI_API}/analyses/${plantDataId}`);
        setViewOptions({
          options: {
            picture: dataImg.map,
            inspection: dataImg.mask,
          },
          width: dataImg.height,
          height: dataImg.width,
          plants: dataPlant.plants.map(({ location: [y, x], ...res }) => ({
            y,
            x,
            ...res,
          })),
        });
        setOnRequest(false);
      } catch (e) {
        setOnRequest(false);
        console.error(e);
      }
    })();
  }, [plantDataId, imgData]);

  return { onRequest, viewOptions };
};
