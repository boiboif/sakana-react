import { animated, config, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useControllableValue, useSize } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import controlIcon from '../assets/favicon.ico';
import chisato from '../assets/img/chisato.png';
import takina from '../assets/img/takina.png';
import { useSpringDomMove } from '../hooks';

type DefaultCharacter = 'takina' | 'chisato';

// Image imports can be URL strings or static image metadata (e.g. Next.js).
function imageUrl(image: string | { src: string }): string {
  return typeof image === 'string' ? image : image.src;
}

interface SakanaReactProps {
  width?: number | string;
  characterSize?: number | string;
  showLine?: boolean;
  lineWidth?: number;
  strokeStyle?: string;
  style?: React.CSSProperties;
  className?: string;
  character?: DefaultCharacter;
  defaultCharacter?: DefaultCharacter;
  customCharacter?: string;
  onControlerClick?: () => void;
  controlerSize?: number | string;
  customControler?: React.ReactNode;
  showControler?: boolean;
}

const SakanaReact = (props: SakanaReactProps): React.ReactElement => {
  const {
    width = 200,
    characterSize = '80%',
    showLine = true,
    lineWidth = 4,
    strokeStyle = '#333',
    style,
    className,
    customCharacter,
    onControlerClick,
    customControler,
    controlerSize = 26,
    showControler = true,
  } = props;
  const [character, setCharacter] = useControllableValue<DefaultCharacter>(
    props,
    {
      valuePropName: 'character',
      defaultValuePropName: 'defaultCharacter',
      defaultValue: 'takina',
    },
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef(0);
  const offset = useRef({
    x: 0,
    y: 0,
  });
  const imgSrc =
    customCharacter ?? imageUrl(character === 'chisato' ? chisato : takina);

  const wrapperSize = useSize(wrapperRef);
  const redraw = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!wrapperSize || !canvas || !ctx) return;
    const size = Math.min(wrapperSize.width, wrapperSize.height);
    canvas.width = size;
    canvas.height = size;
    sizeRef.current = size;
    const center = size / 2;
    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      if (!showLine) return;
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = strokeStyle;
      ctx.lineCap = 'round';
      ctx.moveTo(center, center);
      ctx.lineTo(center + offset.current.x, center + offset.current.y);
      ctx.stroke();
    };
    redraw.current = draw;
    draw();
    return () => {
      redraw.current = null;
    };
  }, [wrapperSize, lineWidth, showLine, strokeStyle]);

  const [springProps, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    onChange: (param) => {
      offset.current = { x: param.value.x, y: param.value.y };
      redraw.current?.();
    },
  }));

  /** 根据半径和弧度计算位置 */
  const getPositionByRadian = (radian: number, radius: number) => {
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    return { x, y };
  };

  /** 拖动时初始位置 */
  const initX = useRef(0);
  const initY = useRef(0);
  const bind = useDrag(({ active, movement: [mx, my], down, first }) => {
    if (first) {
      initX.current = springProps.x.get();
      initY.current = springProps.y.get();
    }
    if (active) {
      const realX = mx + initX.current;
      const realY = my + initY.current;
      const radian = Math.atan2(realY, realX);
      const distance = Math.sqrt(realY * realY + realX * realX);
      const radius =
        distance >= sizeRef.current / 2 ? sizeRef.current / 2 : distance;
      const { x, y } = getPositionByRadian(radian, radius);

      api.start({
        x,
        y,
        rotate: Math.max(Math.min(45, x / 2), -45),
        config: {
          ...config.stiff,
          friction: undefined,
        },
      });
    }

    if (down === false) {
      api.start({
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

  const { wrapperProps, control } = useSpringDomMove({
    onControlClick: () => {
      if (!customCharacter) {
        setCharacter(character === 'chisato' ? 'takina' : 'chisato');
      }
      onControlerClick?.();
    },
  });

  return (
    <animated.div
      ref={wrapperRef}
      className={className}
      style={{
        width,
        height: width,
        position: 'relative',
        zIndex: 999,
        touchAction: 'none',
        ...style,
        ...wrapperProps,
      }}
    >
      <div
        {...bind()}
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <canvas
          ref={canvasRef}
          id="bar-canvas"
          style={{ position: 'absolute' }}
        />
        <animated.img
          draggable={false}
          src={imgSrc}
          style={{
            ...springProps,
            width: characterSize,
            userSelect: 'none',
          }}
          alt=""
        />
      </div>
      {showControler && (
        <div
          {...control()}
          style={{ position: 'absolute', right: -15, bottom: -15 }}
        >
          {customControler ?? (
            <img
              style={{ cursor: 'move', userSelect: 'none' }}
              width={controlerSize}
              draggable={false}
              src={imageUrl(controlIcon)}
              alt="切换角色"
            />
          )}
        </div>
      )}
    </animated.div>
  );
};

export default React.memo(SakanaReact);
