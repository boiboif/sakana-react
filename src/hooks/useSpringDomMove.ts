import { SpringValues, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface UseSpringDomMoveProps {
  onControlClick?: () => void;
}

export const useSpringDomMove = (
  props: UseSpringDomMoveProps,
): {
  wrapperProps: SpringValues<{ x: number; y: number }>;
  control: ReturnType<typeof useDrag>;
} => {
  const { onControlClick } = props;

  const [wrapperProps, wrapperApi] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  const control = useDrag(({ offset: [x, y], last, tap }) => {
    wrapperApi.start({
      x,
      y,
    });

    if (last && tap) {
      onControlClick?.();
    }
  });

  return { wrapperProps, control };
};
