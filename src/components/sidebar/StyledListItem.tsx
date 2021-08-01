import React, { ReactChildren, useCallback, useMemo } from 'react';

/**
 * Next
 */
import { useRouter } from 'next/router';

/**
 * Material
 */
import { ListItem } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

interface StyledListItemProps {
  onClick: (event: React.MouseEvent<{}>) => void;
  selected: boolean;
}

interface SidebarMenuItemProps {
  pathname: string;
  children: JSX.Element[];
}

const StyledListItem = withStyles((theme: Theme) => ({
  selected: {
    borderRight: `4px solid ${theme.palette.primary.main}`,
  },
}))((props: StyledListItemProps) => <ListItem button {...props} />);

function SidebarMenuItem({ pathname, children }: SidebarMenuItemProps) {
  const router = useRouter();

  const selected = useMemo(() => {
    return router.pathname === pathname;
  }, []);

  const handleClick = useCallback((event: React.MouseEvent<{}>) => {
    router.push(pathname);
  }, []);

  return (
    <StyledListItem selected={selected} onClick={handleClick}>
      {children}
    </StyledListItem>
  );
}

export default SidebarMenuItem;
