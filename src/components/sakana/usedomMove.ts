import { useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';

interface UseDomMoveProps {
  onControlClick?: () => void;
}

const useDomMove = (props: UseDomMoveProps) => {
  const { onControlClick } = props;

  const [wrapperProps, wrapperApi] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  const control = useDrag(({ offset: [x, y], distance, down }) => {
    wrapperApi({
      x,
      y,
    });

    if (down === false && distance === 0) {
      onControlClick?.();
    }
  });

  return { wrapperProps, control };
};

export default useDomMove;
