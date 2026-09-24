import React from 'react';
import { useSearchParams } from 'react-router-dom';
import MapView from '../components/MapView';

export default function MapPage() {
  const [searchParams] = useSearchParams();
  const initialFacilityId = searchParams.get('facility');
  const initialCategory = searchParams.get('category');
  const initialWard = searchParams.get('ward');
  const initialProject = searchParams.get('project');
  const initialRoad = searchParams.get('road');
  const initialSearch = searchParams.get('search');
  const initialTab = searchParams.get('tab') || 'overview';

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 105px)', position: 'relative', overflow: 'hidden' }}>
      <MapView
        initialSelectedId={initialFacilityId}
        initialCategory={initialCategory}
        initialWard={initialWard}
        initialProject={initialProject}
        initialRoad={initialRoad}
        initialSearch={initialSearch}
        initialTab={initialTab}
        isEmbedded={false}
      />
    </div>
  );
}
