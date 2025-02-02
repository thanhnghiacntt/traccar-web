import { useId, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/styles';
import { map } from './core/MapView';
import { findFonts, tollstationToFeature } from './core/mapUtil';
import { useAttributePreference } from '../common/util/preferences';

const MapTollstation = () => {
  const id = useId();

  const theme = useTheme();

  const mapTollstations = useAttributePreference('mapTollstations', true);

  const tollstations = useSelector((state) => state.tollstation.items);

  useEffect(() => {
    if (mapTollstations) {
      map.addSource(id, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });
      map.addLayer({
        source: id,
        id: 'geofences-fill',
        type: 'fill',
        filter: [
          'all',
          ['==', '$type', 'Polygon'],
        ],
        paint: {
          'fill-color': ['get', 'color'],
          'fill-outline-color': ['get', 'color'],
          'fill-opacity': 0.1,
        },
      });
      map.addLayer({
        source: id,
        id: 'geofences-line',
        type: 'line',
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 2,
        },
      });
      map.addLayer({
        source: id,
        id: 'geofences-title',
        type: 'symbol',
        layout: {
          'text-field': '{name}',
          'text-font': findFonts(map),
          'text-size': 12,
        },
        paint: {
          'text-halo-color': 'white',
          'text-halo-width': 1,
        },
      });

      return () => {
        if (map.getLayer('geofences-fill')) {
          map.removeLayer('geofences-fill');
        }
        if (map.getLayer('geofences-line')) {
          map.removeLayer('geofences-line');
        }
        if (map.getLayer('geofences-title')) {
          map.removeLayer('geofences-title');
        }
        if (map.getSource(id)) {
          map.removeSource(id);
        }
      };
    }
    return () => {};
  }, [mapTollstations]);

  useEffect(() => {
    if (mapTollstations) {
      map.getSource(id).setData({
        type: 'FeatureCollection',
        features: Object.values(tollstations).map((geofence) => tollstationToFeature(theme, geofence)),
      });
    }
  }, [mapTollstations, tollstations]);

  return null;
};

export default MapTollstation;
