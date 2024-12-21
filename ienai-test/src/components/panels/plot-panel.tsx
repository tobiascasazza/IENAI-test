import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false, loading: () => <div>Loading Plot editor...</div> });

export const PlotPanel: React.FC<{ plots: { data: never; layout: never }[] }> = ({plots}) => {

  const plotElements = useMemo(() => {
    return plots.map((plot, index) => (
      <Plot key={index} data={plot.data} layout={plot.layout} />
    ));
  }, [plots]);

  return (
    <div>
      {plotElements}
    </div>
  );
};