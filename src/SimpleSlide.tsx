import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";

interface Props {
  visible: boolean;
}

const SimpleSlide: React.FC<Props> = ({
  children,
  visible,
  style,
  ...rest
}) => {
  const el: any = useRef(null);
  const [open, setOpen] = useState(visible);
  const [height, setHeight] = useState("0");
  const [overflow, setOverflow] = useState("hidden");

  const styleProp = useMemo(
    () => ({
      height,
      overflow,
      transition: "height .3s ease-in-out",
      ...style
    }),
    [height, overflow, style]
  );

  const openCallback = useCallback(() => {
    if (el.current) {
      setHeight(el.current.scrollHeight);
      setOverflow("hidden");
    }
  }, []);

  const onTransitionEndHandler = useCallback(() => {
    setOpen(visible);
    setHeight(visible ? "" : "0");
    setOverflow(visible ? "" : "hidden");
  }, [visible]);

  // Open
  useEffect(() => {
    if (open) {
      openCallback();
    }
  }, [open, openCallback]);

  // Close
  useEffect(() => {
    if (!visible && el.current && height === el.current.scrollHeight) {
      setHeight("0");
    }
  }, [visible, height]);

  useLayoutEffect(() => {
    if (visible) {
      setOpen(true);
    } else {
      openCallback();
    }
  }, [visible, openCallback]);

  return (
    <>
      {open && (
        <div
          onTransitionEnd={onTransitionEndHandler}
          ref={el}
          style={styleProp}
          {...rest}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default SimpleSlide;
