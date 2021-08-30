import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line import/no-anonymous-default-export
export default (theme: Theme) =>
  createStyles({
    '@global': {
      'body, html, #root': {
        width: '100%',
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });
