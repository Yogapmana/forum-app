import LoadingBar from './LoadingBar';

export default {
  title: 'Components/LoadingBar',
  component: LoadingBar,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  args: {
    loading: true,
  },
};

export const Hidden = {
  args: {
    loading: false,
  },
};
