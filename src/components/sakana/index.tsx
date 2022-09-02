import { useSpring, animated, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import takina from '@/assets/img/takina.png';
import { useEffect, useRef } from 'react';

interface SakanaProps {
  width?: number | string;
  height?: number | string;
  sakanaSize?: number | string;
  showLine?: boolean;
  lineWidth?: number;
  strokeStyle?: string;
  style?: React.CSSProperties;
  className?: string;
}

const Sakana = (props: SakanaProps) => {
  const {
    width = 200,
    height = 200,
    sakanaSize = '80%',
    showLine = true,
    lineWidth = 5,
    strokeStyle = '#333',
    style,
    className,
  } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef(0);
  const lineEndPos = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const wrapperRect = wrapperRef.current?.getBoundingClientRect();
    if (wrapperRect) {
      const size = Math.min(wrapperRect.width, wrapperRect.height);
      canvasRef.current!.width = size;
      canvasRef.current!.height = size;
      sizeRef.current = size;
      lineEndPos.current = {
        x: size / 2,
        y: size / 2,
      };
    }
  }, []);

  const draw = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && showLine) {
      ctx.clearRect(0, 0, 300, 300);
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = strokeStyle;
      ctx.lineCap = 'round';
      ctx.moveTo(sizeRef.current / 2, sizeRef.current / 2);
      ctx.lineTo(lineEndPos.current.x, lineEndPos.current.y);
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  };

  const [springProps, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    onChange: (param) => {
      lineEndPos.current = {
        x: param.value.x + sizeRef.current / 2,
        y: param.value.y + sizeRef.current / 2,
      };
    },
  }));

  /** 根据半径和弧度计算位置 */
  const getPositionByRadian = (radian: number, radius: number) => {
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    return { x, y };
  };

  const bind = useDrag(({ active, movement: [mx, my], down, first }) => {
    /** 拖动时初始位置 */
    let initX = 0,
      initY = 0;
    if (first) {
      draw();
      initX = springProps.x.get();
      initY = springProps.y.get();
    }
    if (active) {
      const realX = mx + initX;
      const realY = my + initY;
      const radian = Math.atan2(realY, realX);
      const distance = Math.sqrt(realY * realY + realX * realX);
      const radius = distance >= sizeRef.current / 2 ? sizeRef.current / 2 : distance;
      const { x, y } = getPositionByRadian(radian, radius);

      api({
        x,
        y,
        rotate: Math.max(Math.min(45, x / 2), -45),
        config: {
          friction: undefined,
        },
      });
    }

    if (down === false) {
      api({
        x: 0,
        y: 0,
        rotate: 0,
        config: {
          ...config.wobbly,
          friction: 0.3,
        },
      });
    }
  });

  return (
    <div
      {...bind()}
      ref={wrapperRef}
      className={className}
      style={{
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        position: 'relative',
        zIndex: 999,
        touchAction: 'none',
        ...style,
      }}
    >
      <canvas ref={canvasRef} id="bar-canvas" style={{ position: 'absolute' }} />
      <animated.img
        className="select-none"
        draggable={false}
        src={takina}
        style={{
          ...springProps,
          width: sakanaSize,
        }}
        alt=""
      />
    </div>
  );
};

export default Sakana;
