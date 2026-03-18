import { useSelector, useDispatch } from 'react-redux';
import VoteButton from './VoteButton';
import { asyncToggleVoteComment } from '../states/threadDetail/slice';
import postedAt from '../utils/postedAt';

function CommentCard({ comment, threadId }) {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const isUpVoted = authUser ? comment.upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser ? comment.downVotesBy.includes(authUser.id) : false;

  const onUpVote = () => {
    if (!authUser) return;
    const voteType = isUpVoted ? 'neutral' : 'up-vote';
    dispatch(asyncToggleVoteComment({
      threadId, commentId: comment.id, voteType, userId: authUser.id,
    }));
  };

  const onDownVote = () => {
    if (!authUser) return;
    const voteType = isDownVoted ? 'neutral' : 'down-vote';
    dispatch(asyncToggleVoteComment({
      threadId, commentId: comment.id, voteType, userId: authUser.id,
    }));
  };

  return (
    <div className="border-b border-gray-100 dark:border-dark-border py-4 last:border-b-0">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={comment.owner.avatar}
          alt={comment.owner.name}
          className="w-7 h-7 rounded-full"
        />
        <span className="text-sm font-medium text-primary dark:text-gray-100">{comment.owner.name}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">{postedAt(comment.createdAt)}</span>
      </div>
      <div
        className="text-sm text-gray-700 dark:text-gray-300 mb-2 prose prose-sm dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
      <div className="flex items-center gap-3">
        <VoteButton
          type="up"
          count={comment.upVotesBy.length}
          active={isUpVoted}
          onClick={onUpVote}
          disabled={!authUser}
        />
        <VoteButton
          type="down"
          count={comment.downVotesBy.length}
          active={isDownVoted}
          onClick={onDownVote}
          disabled={!authUser}
        />
      </div>
    </div>
  );
}

export default CommentCard;
