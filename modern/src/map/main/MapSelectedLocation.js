import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import dimensions from '../../common/theme/dimensions';
import { map } from '../core/MapView';
import { usePrevious } from '../../reactHelper';
import { useAttributePreference } from '../../common/util/preferences';

const MapSelectedLocation = ({ positions }) => {
  // const selectedDeviceId = useSelector((state) => state.devices.selectedId);
  const selectedStopIndex = useSelector((state) => state.reports.selectedStopId);
  const previousSelectId = usePrevious(selectedStopIndex);

  const selectZoom = useAttributePreference('web.selectZoom', 15);
  const mapFollow = useAttributePreference('mapFollow', false);
  let position = null;

  useEffect(() => {
    if (selectedStopIndex >= 0) {
      position = positions[selectedStopIndex];
    }
    if ((selectedStopIndex !== previousSelectId || mapFollow || selectedStopIndex) && position) {
      map.easeTo({
        center: [position.longitude, position.latitude],
        zoom: Math.max(map.getZoom(), selectZoom),
        offset: [0, -dimensions.popupMapOffset / 2],
      });
      // console.log(selectedStopIndex);
    }
  });

  return null;
};

export default MapSelectedLocation;
