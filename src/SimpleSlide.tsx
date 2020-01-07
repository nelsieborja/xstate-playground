import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";

interface Props {
  visible: boolean;
}

const defaultStyle = {
  style: { height: "0", overflow: "hidden" }
};

const SimpleSlide: React.FC<Props> = ({ children, visible, ...rest }) => {
  const el: any = useRef(null);
  const [open, setOpen] = useState(visible);
  const [dynamicProps, setDynamicProps] = useState<{
    onTransitionEnd?: any;
    style: { [K: string]: any };
  }>(defaultStyle);

  // Open
  useEffect(() => {
    if (open) {
      setDynamicProps({
        onTransitionEnd: () => {
          setDynamicProps({
            style: {
              height: "",
              overflow: ""
            }
          });
        },
        style: {
          height: el.current.scrollHeight,
          overflow: "hidden"
        }
      });
    }
  }, [open]);

  // Close
  useEffect(() => {
    if (
      !visible &&
      el.current &&
      dynamicProps.style.height === el.current.scrollHeight
    ) {
      setDynamicProps({
        onTransitionEnd: () => {
          setOpen(false);
        },
        ...defaultStyle
      });
    }
  }, [visible, open, dynamicProps.style.height]);

  useLayoutEffect(() => {
    if (visible) {
      setOpen(true);
    } else {
      if (el.current) {
        setDynamicProps({
          style: {
            height: el.current.scrollHeight,
            overflow: "hidden"
          }
        });
      }
    }
  }, [visible, open]);

  const { style: dynamicPropsStyle, ...dynamicPropsRest } = dynamicProps;

  const style = useMemo(
    () => ({ transition: "height .3s ease-in-out", ...dynamicPropsStyle }),
    [dynamicPropsStyle]
  );

  return (
    <>
      visible: {visible.toString()}
      <br />
      open: {open.toString()}
      {open && (
        <div ref={el} style={style} {...dynamicPropsRest} {...rest}>
          {children}
        </div>
      )}
    </>
  );
};

export default SimpleSlide;
