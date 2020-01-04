import React, { useCallback, useRef, useEffect } from "react";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";
import { TweenMax } from "gsap";

const slideMachine = Machine({
  initial: "closed",
  states: {
    closed: {
      on: {
        OPEN: "opening"
      }
    },
    opening: {
      invoke: {
        src: "openSlide",
        onDone: {
          target: "open"
        }
      },
      on: {
        CLOSE: "closing"
      }
    },
    open: {
      on: {
        CLOSE: "closing"
      }
    },
    closing: {
      invoke: {
        src: "closeSlide",
        onDone: {
          target: "closed"
        }
      },
      on: {
        OPEN: "opening"
      }
    }
  }
});

interface Props {
  onToggle: (flag: boolean) => void;
  visible: boolean;
}

const SlideMachine: React.FC<Props> = ({ children, onToggle, visible }) => {
  const el = useRef();

  // services the machine can "invoke"
  const openSlide = useCallback((context, event) => {
    return new Promise(resolve => {
      TweenMax.fromTo(
        el.current,
        {
          height: 0
        },
        {
          height: el.current.scrollHeight,
          duration: 0.3,
          ease: "slow",
          onComplete: resolve
        }
      ).then(() => {
        TweenMax.to(el.current, 0, { height: "auto", overflow: "" });
      });
    });
  }, []);

  const closeSlide = useCallback((context, event) => {
    return new Promise(resolve => {
      TweenMax.to(el.current, 0.3, {
        height: 0,
        overflow: "hidden",
        ease: "slow",
        onComplete: resolve
      });
    });
  }, []);

  const [current, send] = useMachine(slideMachine, {
    services: {
      openSlide,
      closeSlide
    }
  });

  const btnText =
    current.matches("open") || current.matches("opening") ? "CLOSE" : "OPEN";

  const slideBtnCallback = useCallback(() => {
    send(btnText);
    onToggle(btnText === "OPEN" ? true : false);
  }, [btnText, onToggle, send]);

  useEffect(() => {
    send(visible ? "OPEN" : "CLOSE");
  }, [send, visible]);

  return (
    <div ref={el}>
      <button onClick={slideBtnCallback}>{btnText.toLowerCase()}</button>
      {children}
    </div>
  );
};

export default SlideMachine;
