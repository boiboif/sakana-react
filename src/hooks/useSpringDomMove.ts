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

  const control = useDrag(({ offset: [x, y], down, movement: [mx, my] }) => {
    wrapperApi({
      x,
      y,
    });

    if (down === false && mx + my === 0) {
      onControlClick?.();
    }
  });

  return { wrapperProps, control };
};
