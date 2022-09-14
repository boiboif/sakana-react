import { useSpring } from 'react-spring';
import { useDrag } from '@use-gesture/react';

interface UseDomMoveProps {
  onControlClick?: () => void;
}

const useDomMove = (props: UseDomMoveProps) => {
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

export default useDomMove;
