import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  pos?: Position;
  canDrag?: boolean;
}
const Container = styled.div.attrs<ContainerProps>(({
  pos
}) => ({
  style: {
    left: `${pos?.x}px`,
    top: `${pos?.y}px`,
  },
})) <ContainerProps>`
  ${props => props.canDrag && `
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  `}

  position: absolute;
  touch-action: none;
`;

//  ${props => props.pos && `left: ${props.pos.x}px;`}
//  ${props => props.pos && `top: ${props.pos.y}px;`}
export interface Position {
  x: number; // px
  y: number; // px
}

export interface DraggableProps {
  canDrag?: boolean;
  children: React.ReactNode;
  defaultPosition: Position;
  parentRef: HTMLDivElement;
  onStartDragging?: () => void;
  onEndDragging?: (endPosition: Position) => void;
}

export const Draggable = (props: DraggableProps): JSX.Element => {

  const {
    canDrag = true,
    children,
    defaultPosition,
    parentRef,
    onEndDragging
  } = props;

  const [posX, setPosX] = useState<number>(defaultPosition.x);
  const [posY, setPosY] = useState<number>(defaultPosition.y);

  const [refX, setRefX] = useState<number>(0);
  const [refY, setRefY] = useState<number>(0);

  const [isDown, setIsDown] = useState<boolean>(false);

  const divOverlayRef = useRef<HTMLDivElement>(null);
  const [rect] = useState<DOMRect | undefined>(parentRef.getBoundingClientRect());

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDown) return;
    if (!rect) return;

    setPosX((event.pageX - refX));
    setPosY((event.pageY - refY));

    event.stopPropagation();
    event.preventDefault();
  }, [refX, refY, isDown, rect]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!isDown) return;
    if (!rect) return;

    setPosX((event.changedTouches[0].pageX - refX));
    setPosY((event.changedTouches[0].pageY - refY));

    event.stopPropagation();
    event.preventDefault();
  }, [refX, refY, isDown, rect]);

  const handleMouseUp = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setIsDown(false);

    if (onEndDragging)
      onEndDragging({ x: posX, y: posY });

    event.stopPropagation();
    event.preventDefault();
  }, [posX, posY, onEndDragging]);

  const handleTouchUp = useCallback((event: TouchEvent) => {
    event.preventDefault();
    setIsDown(false);
    
    if (onEndDragging)
      onEndDragging({ x: posX, y: posY });

    event.stopPropagation();
    event.preventDefault();
  }, [posX, posY, onEndDragging]);

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!divOverlayRef.current || !canDrag) return;

    setIsDown(true);

    setRefX(event.pageX - divOverlayRef.current.offsetLeft);
    setRefY(event.pageY - divOverlayRef.current.offsetTop);

    event.stopPropagation();
    event.preventDefault();
  }, [canDrag, divOverlayRef]);

  const handleTouchDown = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    if (!divOverlayRef.current || !canDrag) return;
    setIsDown(true);

    setRefX(event.changedTouches[0].pageX - divOverlayRef.current.offsetLeft);
    setRefY(event.changedTouches[0].pageY - divOverlayRef.current.offsetTop);

    event.stopPropagation();
    event.preventDefault();
  }, [canDrag, divOverlayRef]);

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
  }, [isDown, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchUp]);

  return (
    <Container
      canDrag={canDrag}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchDown}
      pos={{ x: posX, y: posY }}
      ref={divOverlayRef}
    >
      {children}
    </Container>
  );
};

export default Draggable;