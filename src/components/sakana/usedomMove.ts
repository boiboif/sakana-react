import { useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface UseDomMoveProps {
    onControlClick?: () => void;
}

const useDomMove = ({ onControlClick }: UseDomMoveProps) => {
    const [wrapperProps, wrapperApi] = useSpring<{ x: number; y: number }>(() => ({
        x: 0,
        y: 0,
    }));

    const control = useDrag(({ offset: [x, y], down, movement: [mx, my] }) => {
        wrapperApi({ x, y });

        if (!down && mx + my === 0 && onControlClick) {
            onControlClick();
        }
    });

    return { wrapperProps, control };
};

export default useDomMove;
