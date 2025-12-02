
import React, { useEffect } from 'react';
import { AdUnitProps } from '../types';
import { ADSENSE_ID } from '../constants';

const AdSenseUnit: React.FC<AdUnitProps> = ({ slot, format = 'auto', layout, layoutKey, style }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center my-4 bg-gaming-800/50 rounded-lg overflow-hidden min-h-[100px]">
        <div className="text-xs text-slate-500 absolute">Advertisement</div>
        <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', ...style }}
            data-ad-client={ADSENSE_ID}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
            data-ad-layout={layout}
            data-ad-layout-key={layoutKey}
        />
    </div>
  );
};

export default AdSenseUnit;
