import React, { useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';

function DebugObserver() {
  const snapshot = useRecoilSnapshot();

  useEffect(() => {
    console.debug('The following atoms were modified:');
    const iterableRecoilValue = snapshot.getNodes_UNSTABLE({
      isModified: true,
    });
    for (const node of iterableRecoilValue) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

export default DebugObserver;
