import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (
          container: HTMLElement,
          options: {
            center: unknown;
            level: number;
          },
        ) => unknown;
        Marker: new (options: {
          map?: unknown;
          position: unknown;
        }) => {
          setMap: (map: unknown) => void;
        };
        InfoWindow: new (options: {
          content: string;
        }) => {
          open: (map: unknown, marker: unknown) => void;
        };
        services: {
          Geocoder: new () => {
            addressSearch: (
              address: string,
              callback: (
                result: Array<{ x: string; y: string }>,
                status: string,
              ) => void,
            ) => void;
          };
          Status: {
            OK: string;
          };
        };
      };
    };
  }
}

type KakaoMapProps = {
  address: string;
  level?: number;
};

export default function KakaoMap({
  address,
  level = 3,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const kakaoMapKey = import.meta.env.VITE_KAKAO_MAP_JS_KEY;
    const scriptId = 'kakao-map-script';

    if (!kakaoMapKey || !mapRef.current || !address) return;

    const initMap = () => {
      if (!window.kakao || !mapRef.current) return;

      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
          if (status !== window.kakao.maps.services.Status.OK || !result.length) {
            return;
          }

          const coords = new window.kakao.maps.LatLng(
            Number(result[0].y),
            Number(result[0].x),
          );

          const map = new window.kakao.maps.Map(mapRef.current!, {
            center: coords,
            level,
          });

          const marker = new window.kakao.maps.Marker({
            position: coords,
          });

          marker.setMap(map);

          const infoWindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:6px 10px;font-size:12px;">${address}</div>`,
          });

          infoWindow.open(map, marker);
        });
      });
    };

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (existingScript) {
      initMap();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = initMap;
    document.head.appendChild(script);
  }, [address, level]);

  return <div ref={mapRef} className="h-[320px] w-full rounded-xl border" />;
}