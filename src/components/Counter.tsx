import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { counterState } from '../store';

function Counter() {
  const [count, setCount] = useRecoilState(counterState);

  const onIncrement = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const onDecrement = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  return (
    <div>
      <h1>카운터</h1>
      <h2>{count}</h2>

      <div>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
      </div>
    </div>
  );
}

export default Counter;
