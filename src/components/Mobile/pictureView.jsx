import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { ROMI_API } from 'utils/constants';
import { PlantContext } from 'utils/providers/plant';
import useRouter from 'utils/hooks/router';
import Loading from 'components/Loader';
import { useRomiAnalyses } from 'components/PictureView/api';
import Button from 'components/Button';

import {
  Centered,
  PVContainer,
  PVCard,
  PVThumbnailContainer,
  PVThumbnail,
  PVDataContainer,
  PVData,
  Bold,
  PVButtonList,
} from './style';

const PictureView = ({ imgData, plantData, scanId }) => {
  const [select, setSelect] = useState('picture');
  const { setPlant } = useContext(PlantContext);

  const { onRequest, viewOptions } = useRomiAnalyses(imgData, plantData.id);
  const router = useRouter();

  const goToPlant = id => {
    setPlant({ id });
    if (!router.pathname.includes('plant')) router.push(`/plant/${scanId}`);
  };

  if (onRequest) return <Loading />;
  if (!imgData || !viewOptions) return <Centered>There is no image or plant analyses of the board</Centered>;
  return (
    <PVContainer>
      <PVButtonList>
        <Button active={select === 'picture'} onClick={() => setSelect('picture')}>
          Picture
        </Button>
        <Button active={select === 'inspection'} onClick={() => setSelect('inspection')}>
          Inspection
        </Button>
      </PVButtonList>
      {viewOptions.plants.map(({ id, image, mask, x, y }) => (
        <PVCard key={id}>
          <PVThumbnailContainer
            onClick={() => {
              goToPlant(id);
            }}
          >
            <PVThumbnail
              alt={`thumbnail-${id}`}
              src={`${ROMI_API}/images/${select === 'inspection' ? mask : image}?size=thumb&orientation=horizontal`}
            />
          </PVThumbnailContainer>
          <PVDataContainer>
            <PVData>
              <Bold>ID</Bold>:{id}
            </PVData>
            <PVData>
              <Bold>X</Bold>:{Math.round(x)}
            </PVData>
            <PVData>
              <Bold>Y</Bold>:{Math.round(y)}
            </PVData>
          </PVDataContainer>
        </PVCard>
      ))}
    </PVContainer>
  );
};

PictureView.propTypes = {
  imgData: PropTypes.shape({
    id: PropTypes.string,
  }),
  plantData: PropTypes.shape({
    id: PropTypes.string,
  }),
  scanId: PropTypes.string,
};

PictureView.defaultProps = {
  imgData: undefined,
  plantData: undefined,
  scanId: '',
};

export default PictureView;
