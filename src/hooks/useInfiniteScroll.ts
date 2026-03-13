// 무한 스크롤 훅 추가
// 일단 폴더가 애매해서 훅 형태로 넣었습니다.
import { useRef, useEffect } from 'react';

const useInfiniteScroll = (onLoadMore: () => void, hasMore: boolean) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) onLoadMore();
      },
      { rootMargin: '100px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasMore, onLoadMore]);

  return ref;
};

export default useInfiniteScroll;
