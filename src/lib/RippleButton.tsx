import * as React from "react";
import "./RippleButton.scss";


try{
  if(typeof window != "undefined"){
      document.body.addEventListener("click", (e) =>{
          // @ts-ignore
          if(e.target.nodeName == "BUTTON" && e.target!.classList!.contains("simple-btn")){
              // @ts-ignore
              const handleClick = TargetMap.get(e.target.dataset.btnId);
              // @ts-ignore
              // const handleClick = TargetMap.get(e.target);
              if(handleClick){
                  const span = document.createElement("span")
                  const button = e.target
                  if(button){
                      // @ts-ignore
                      const {left, top} = button.getBoundingClientRect()

                      // @ts-ignore
                      button.appendChild(span)
                      // @ts-ignore
                      span.style.cssText = `--width: ${button.getBoundingClientRect().width}px;--height: ${button.getBoundingClientRect().width}px`;
                      // @ts-ignore
                      span.style.left = (e.pageX - left)+'px'
                      // @ts-ignore
                      span.style.top = (e.pageY - top)+'px'
                      span.style.animation = "ripple 0.5s linear"
                      span.addEventListener("animationend", () =>{
                          span.remove()
                      })
                  }

                  // @ts-ignore
                  handleClick()
              }
          }
      })
  }
}catch(err){
  
}
const TargetMap = new Map()

export default function RippleButton({
  handleClick,
  children,
  variant = 'primary',
}: {
  handleClick?: () => void;
  children: React.ReactNode;
  variant?:
    | 'primary'
    | 'secondary'
    | 'alert'
    | 'success'
    | 'failed'
    | 'disabled';
}) {
  const id = React.useId();

  return (
    <button
      data-btn-id={id}
      className={`simple-btn ${variant}`}
      ref={(node) => {
        TargetMap.set(id, handleClick);
        // TargetMap.set(node, handleClick)
      }}
    >
      {children}
    </button>
  );
}