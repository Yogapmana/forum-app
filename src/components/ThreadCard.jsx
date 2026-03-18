import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import VoteButton from './VoteButton';
import { asyncToggleVoteThreadList } from '../states/threads/slice';
import postedAt from '../utils/postedAt';

function ThreadCard({ thread, owner }) {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const isUpVoted = authUser ? thread.upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser ? thread.downVotesBy.includes(authUser.id) : false;

  const onUpVote = (e) => {
    e.preventDefault();
    if (!authUser) return;
    const voteType = isUpVoted ? 'neutral' : 'up-vote';
    dispatch(asyncToggleVoteThreadList({
      threadId: thread.id, voteType, userId: authUser.id,
    }));
  };

  const onDownVote = (e) => {
    e.preventDefault();
    if (!authUser) return;
    const voteType = isDownVoted ? 'neutral' : 'down-vote';
    dispatch(asyncToggleVoteThreadList({
      threadId: thread.id, voteType, userId: authUser.id,
    }));
  };

  const bodySnippet = thread.body.length > 140
    ? `${thread.body.replace(/<[^>]*>/g, '').substring(0, 140)}...`
    : thread.body.replace(/<[^>]*>/g, '');

  return (
    <article className="group relative bg-white dark:bg-dark-card rounded-xl border border-gray-200/80 dark:border-dark-border p-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-accent/20 hover:-translate-y-0.5">
      {/* Subtle accent glow on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative">
        {/* Header: Author + Time */}
        <div className="flex items-center gap-3 mb-3.5">
          {owner && (
            <div className="flex items-center gap-2.5">
              <img
                src={owner.avatar}
                alt={owner.name}
                className="w-9 h-9 rounded-full ring-2 ring-gray-100 dark:ring-dark-border shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-primary dark:text-gray-100 leading-tight">{owner.name}</span>
                <span className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight mt-0.5">
                  {postedAt(thread.createdAt)}
                </span>
              </div>
            </div>
          )}
          {thread.category && (
            <span className="ml-auto inline-flex items-center gap-1 bg-gradient-to-r from-accent/10 to-blue-400/10 dark:from-accent/20 dark:to-blue-400/20 text-accent text-xs font-medium px-2.5 py-1 rounded-full border border-accent/15 dark:border-accent/25">
              <span className="text-accent/50">#</span>
              {thread.category}
            </span>
          )}
        </div>

        {/* Content */}
        <Link to={`/threads/${thread.id}`} className="block">
          <h3 className="text-[17px] font-bold text-primary dark:text-gray-100 leading-snug group-hover:text-accent transition-colors duration-200 mb-1.5">
            {thread.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{bodySnippet}</p>
        </Link>

        {/* Footer: Votes + Comments */}
        <div className="flex items-center gap-2 pt-3.5 border-t border-gray-100 dark:border-dark-border">
          <div className="flex items-center gap-1 bg-gray-50 dark:bg-white/5 rounded-lg p-0.5">
            <VoteButton
              type="up"
              count={thread.upVotesBy.length}
              active={isUpVoted}
              onClick={onUpVote}
              disabled={!authUser}
            />
            <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
            <VoteButton
              type="down"
              count={thread.downVotesBy.length}
              active={isDownVoted}
              onClick={onDownVote}
              disabled={!authUser}
            />
          </div>

          <div className="flex items-center gap-1.5 ml-auto text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            <span className="text-xs font-semibold tabular-nums">{thread.totalComments}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ThreadCard;
