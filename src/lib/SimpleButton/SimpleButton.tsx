import * as React from 'react';

if (typeof window != 'undefined') {
  document.body.addEventListener('click', (e) => {
    // @ts-ignore
    if (e.target.nodeName == 'BUTTON' && e.target!.classList!.contains('simple-btn')) {
      // @ts-ignore
      const handleClick = TargetMap.get(e.target.dataset.btnId);
        handleClick();
    }
  });
}

const TargetMap = new Map();

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    handleClick?: () => void
    variant?: 'primary' | 'secondary' | 'alert' | 'success' | 'failed' | 'disabled';
} 

export default function SimpleButton({
  handleClick,
  children,
  variant = 'primary',
}: IButtonProps) {
  const id = React.useId();

  return (
    <button
      data-btn-id={id}
      className={`simple-btn ${variant}`}
      ref={() => {
        TargetMap.set(id, handleClick);
      }}
    >
      {children}
    </button>
  );
}
