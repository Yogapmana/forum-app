import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncGetThreadDetail,
  asyncCreateComment,
  asyncToggleVoteThreadDetail,
  clearThreadDetail,
} from '../states/threadDetail/slice';
import CommentCard from '../components/CommentCard';
import VoteButton from '../components/VoteButton';
import LoadingBar from '../components/LoadingBar';
import postedAt from '../utils/postedAt';

function DetailThreadPage() {
  const { id } = useParams();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      await dispatch(asyncGetThreadDetail(id));
      setLoading(false);
    };
    fetchDetail();

    return () => {
      dispatch(clearThreadDetail());
    };
  }, [dispatch, id]);

  const onSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    setSubmitting(true);
    await dispatch(asyncCreateComment({ threadId: id, content: commentContent }));
    setCommentContent('');
    setSubmitting(false);
  };

  const isUpVoted = authUser && threadDetail
    ? threadDetail.upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser && threadDetail
    ? threadDetail.downVotesBy.includes(authUser.id) : false;

  const onUpVote = () => {
    if (!authUser) return;
    const voteType = isUpVoted ? 'neutral' : 'up-vote';
    dispatch(asyncToggleVoteThreadDetail({
      threadId: id, voteType, userId: authUser.id,
    }));
  };

  const onDownVote = () => {
    if (!authUser) return;
    const voteType = isDownVoted ? 'neutral' : 'down-vote';
    dispatch(asyncToggleVoteThreadDetail({
      threadId: id, voteType, userId: authUser.id,
    }));
  };

  if (loading || !threadDetail) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <LoadingBar loading={loading} />
        <div className="text-center py-12 text-gray-400 dark:text-gray-500">Memuat detail thread...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-dark-border p-6 mb-6">
        {threadDetail.category && (
          <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-accent text-xs px-2 py-0.5 rounded-full mb-3">
            #
            {threadDetail.category}
          </span>
        )}
        <h1 className="text-2xl font-bold text-primary dark:text-white mb-3">{threadDetail.title}</h1>

        <div className="flex items-center gap-3 mb-4">
          <img
            src={threadDetail.owner.avatar}
            alt={threadDetail.owner.name}
            className="w-9 h-9 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-primary dark:text-gray-200">{threadDetail.owner.name}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{postedAt(threadDetail.createdAt)}</p>
          </div>
        </div>

        <div
          className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert mb-4"
          dangerouslySetInnerHTML={{ __html: threadDetail.body }}
        />

        <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-dark-border">
          <VoteButton
            type="up"
            count={threadDetail.upVotesBy.length}
            active={isUpVoted}
            onClick={onUpVote}
            disabled={!authUser}
          />
          <VoteButton
            type="down"
            count={threadDetail.downVotesBy.length}
            active={isDownVoted}
            onClick={onDownVote}
            disabled={!authUser}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-dark-border p-6">
        <h2 className="text-lg font-bold text-primary dark:text-white mb-4">
          Komentar (
          {threadDetail.comments.length}
          )
        </h2>

        {authUser ? (
          <form onSubmit={onSubmitComment} className="mb-6">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Tulis komentar..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition resize-none"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={submitting || !commentContent.trim()}
                className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50"
              >
                {submitting ? 'Mengirim...' : 'Kirim Komentar'}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
            Silakan login untuk menulis komentar.
          </p>
        )}

        <div>
          {threadDetail.comments.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-500 py-4">Belum ada komentar.</p>
          ) : (
            threadDetail.comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                threadId={threadDetail.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailThreadPage;
