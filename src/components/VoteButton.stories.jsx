import VoteButton from './VoteButton';

export default {
  title: 'Components/VoteButton',
  component: VoteButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['up', 'down'],
    },
    count: { control: 'number' },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export const UpVote = {
  args: {
    type: 'up',
    count: 42,
    active: false,
    disabled: false,
  },
};

export const UpVoteActive = {
  args: {
    type: 'up',
    count: 43,
    active: true,
    disabled: false,
  },
};

export const DownVote = {
  args: {
    type: 'down',
    count: 5,
    active: false,
    disabled: false,
  },
};

export const DownVoteActive = {
  args: {
    type: 'down',
    count: 6,
    active: true,
    disabled: false,
  },
};

export const Disabled = {
  args: {
    type: 'up',
    count: 10,
    active: false,
    disabled: true,
  },
};
