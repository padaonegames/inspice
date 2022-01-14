import { useEffect, useRef, useState } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

interface ContainerProps {
  css?: FlattenSimpleInterpolation;
  pos?: Position;
}
const Container = styled.div<ContainerProps>`
  ${props => props.css && props.css}
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;

  position: absolute;
  ${props => props.pos && `left: ${props.pos.x}px;`}
  ${props => props.pos && `top: ${props.pos.y}px;`}

  touch-action: none;
`;

export interface Position {
  x: number; // %
  y: number; // %
}

export interface DraggableProps {
  children: React.ReactNode;
  defaultPosition: Position;
  css?: FlattenSimpleInterpolation;
  parentRef: React.RefObject<HTMLDivElement>;
  onStartDragging?: () => void;
  onEndDragging?: (endPosition: Position) => void;
}

export const Draggable = (props: DraggableProps): JSX.Element => {

  const {
    children,
    defaultPosition,
    css,
    parentRef,
    onStartDragging,
    onEndDragging
  } = props;

  const [posX, setPosX] = useState<number>(defaultPosition.x);
  const [posY, setPosY] = useState<number>(defaultPosition.y);

  const [refX, setRefX] = useState<number>(0);
  const [refY, setRefY] = useState<number>(0);

  const [isDown, setIsDown] = useState<boolean>(false);

  const divOverlayRef = useRef<HTMLDivElement>(null);
  const [rect, _] = useState<DOMRect | undefined>(parentRef.current?.getBoundingClientRect());

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDown) return;
    if (!rect) return;

    setPosX((event.pageX - refX));
    setPosY((event.pageY - refY));

    event.stopPropagation();
    event.preventDefault();
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!isDown) return;
    if (!rect) return;

    setPosX((event.changedTouches[0].pageX - refX));
    setPosY((event.changedTouches[0].pageY - refY));

    event.stopPropagation();
    event.preventDefault();
  };

  const handleMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    setIsDown(false);

    if (onEndDragging)
      onEndDragging({ x: posX, y: posY });

    event.stopPropagation();
    event.preventDefault();
  };

  const handleTouchUp = (event: TouchEvent) => {
    event.preventDefault();
    setIsDown(false);

    event.stopPropagation();
    event.preventDefault();
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!divOverlayRef.current) return;

    setIsDown(true);

    setRefX(event.pageX - divOverlayRef.current.offsetLeft);
    setRefY(event.pageY - divOverlayRef.current.offsetTop);

    event.stopPropagation();
    event.preventDefault();
  };

  const handleTouchDown = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!divOverlayRef.current) return;

    setIsDown(true);

    setRefX(event.changedTouches[0].pageX - divOverlayRef.current.offsetLeft);
    setRefY(event.changedTouches[0].pageY - divOverlayRef.current.offsetTop);

    event.stopPropagation();
    event.preventDefault();
  };

  useEffect(() => {
    if (isDown) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchUp);
    }
  }, [isDown]);

  return (
    <Container
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchDown}
      css={css}
      pos={{ x: posX, y: posY }}
      ref={divOverlayRef}
    >
      {children}
    </Container>
  );
};

export default Draggable;