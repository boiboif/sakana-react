import { useSpring, animated, config } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import takina from '@/assets/img/takina.png';
import chisato from '@/assets/img/chisato.png';
import React, {useCallback, useEffect, useRef} from 'react';
import { useControllableValue, useSize } from 'ahooks';
import controlIcon from '@/assets/favicon.ico';
import useDomMove from './useDomMove';

type defaultCharacter = 'takina' | 'chisato';
interface SakanaProps {
    width?: number | string;
    characterSize?: number | string;
    showLine?: boolean;
    lineWidth?: number;
    strokeStyle?: string;
    style?: React.CSSProperties;
    className?: string;
    character?: defaultCharacter;
    defaultCharacter?: defaultCharacter;
    customCharacter?: string;
    onControlerClick?: () => void;
    controlerSize?: number | string;
    customControler?: React.ReactNode;
    showControler?: boolean;
}

const Sakana = (props: SakanaProps) => {
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
    const [character, setCharacter] = useControllableValue<defaultCharacter>(props, {
        valuePropName: 'character',
        defaultValuePropName: 'defaultCharacter',
        defaultValue: 'takina',
    });
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sizeRef = useRef(0);
    const lineEndPos = useRef({
        x: 0,
        y: 0,
    });
    const imgSrc = customCharacter ?? (character === 'chisato' ? chisato : takina);

    const wrapperSize = useSize(wrapperRef);

    useEffect(() => {
        if (wrapperSize) {
            const size = Math.min(wrapperSize.width, wrapperSize.height);
            canvasRef.current!.width = size;
            canvasRef.current!.height = size;
            sizeRef.current = size;
            lineEndPos.current = {
                x: size / 2,
                y: size / 2,
            };
        }
    }, [wrapperSize]);

    // const draw = () => {
    //     const ctx = canvasRef.current?.getContext('2d');
    //     if (ctx && showLine) {
    //         ctx.clearRect(0, 0, sizeRef.current, sizeRef.current);
    //         ctx.beginPath();
    //         ctx.lineWidth = lineWidth;
    //         ctx.strokeStyle = strokeStyle;
    //         ctx.lineCap = 'round';
    //         ctx.moveTo(sizeRef.current / 2, sizeRef.current / 2);
    //         ctx.lineTo(lineEndPos.current.x, lineEndPos.current.y);
    //         ctx.stroke();
    //     }
    //     requestAnimationFrame(draw);
    // };
    //
    // const { wrapperProps, control } = useDomMove({
    //     onControlClick: () => {
    //         if (!customCharacter) {
    //             setCharacter(character === 'chisato' ? 'takina' : 'chisato');
    //         }
    //         onControlerClick?.();
    //     },
    // });

    const draw = useCallback(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx && showLine) {
            ctx.clearRect(0, 0, sizeRef.current, sizeRef.current);
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = strokeStyle;
            ctx.lineCap = 'round';
            ctx.moveTo(sizeRef.current / 2, sizeRef.current / 2);
            ctx.lineTo(lineEndPos.current.x, lineEndPos.current.y);
            ctx.stroke();
        }
        requestAnimationFrame(draw);
    }, [showLine]);

    const handleControlClick = useCallback(() => {
        if (!customCharacter) {
            setCharacter((prevCharacter) => (prevCharacter === 'chisato' ? 'takina' : 'chisato'));
        }
        onControlerClick?.();
    }, [customCharacter, onControlerClick]);

    const { wrapperProps, control } = useDomMove({
        onControlClick: handleControlClick,
    });


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

    /** 拖动时初始位置 */
    const initX = useRef(0);
    const initY = useRef(0);
    const bind = useDrag(({ active, movement: [mx, my], down, first }) => {
        if (first) {
            draw();
            initX.current = springProps.x.get();
            initY.current = springProps.y.get();
        }
        if (active) {
            const realX = mx + initX.current;
            const realY = my + initY.current;
            const radian = Math.atan2(realY, realX);
            const distance = Math.sqrt(realY * realY + realX * realX);
            const radius = distance >= sizeRef.current / 2 ? sizeRef.current / 2 : distance;
            const { x, y } = getPositionByRadian(radian, radius);

            api({
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
                <canvas ref={canvasRef} id="bar-canvas" style={{ position: 'absolute' }} />
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
                <div {...control()} style={{ position: 'absolute', right: -15, bottom: -15 }}>
                    {customControler ?? (
                        <img
                            style={{ cursor: 'move', userSelect: 'none' }}
                            width={controlerSize}
                            draggable={false}
                            src={controlIcon}
                        />
                    )}
                </div>
            )}
        </animated.div>
    );
};

export default React.memo(Sakana);
