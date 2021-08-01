import React, { useMemo } from 'react';

import { useRouter } from 'next/router';

import { Breadcrumbs, Typography } from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';
import { PreferencePath } from 'src/common/path';

function BreadcrumbsList() {
  const router = useRouter();

  const name = useMemo(() => {
    /**
     * TODO: 동적으로 변경되도록 추가해야함
     */
    const pathList = router.pathname.split('/');
    const rootPath = pathList[1] || '대시보드';
    return { rootPath, childPath: pathList[2] || null };
  }, [router.pathname]);

  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Typography color="textPrimary">{name.rootPath}</Typography>
      {name.childPath && (
        <Typography color="textPrimary">{name.childPath}</Typography>
      )}
    </Breadcrumbs>
  );
}

export default BreadcrumbsList;
