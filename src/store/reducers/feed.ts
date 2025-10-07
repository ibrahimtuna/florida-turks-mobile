import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CATEGORY_ITEM, FEED, COMMENT, SUB_COMMENT } from '../types.ts';

type State = {
  categories: CATEGORY_ITEM[];
  feed: FEED[];
};

const initialState: State = {
  categories: [],
  feed: [],
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeedCategories: (state, action: PayloadAction<CATEGORY_ITEM[]>) => {
      state.categories = action.payload;
    },
    setFeed: (state, action: PayloadAction<FEED[]>) => {
      state.feed = action.payload;
    },
    addFeedComment: (
      state,
      action: PayloadAction<{ feedId: string; comment: COMMENT }>,
    ) => {
      const foundComment = state.feed.find(
        item => item._id === action.payload.feedId,
      );
      if (foundComment) {
        foundComment.comments.push(action.payload.comment);
      }
    },
    addFeedSubComment: (
      state,
      action: PayloadAction<{
        feedId: string;
        commentId: string;
        comment: SUB_COMMENT;
      }>,
    ) => {
      const foundFeed = state.feed.find(
        item => item._id === action.payload.feedId,
      );
      if (foundFeed) {
        const foundComment = foundFeed.comments.find(
          item => item._id === action.payload.commentId,
        );
        if (foundComment) {
          foundComment.subComments.push(action.payload.comment);
        }
      }
    },
    toggleLike: (state, action: PayloadAction<{ feedId: string }>) => {
      const foundFeed = state.feed.find(
        item => item._id === action.payload.feedId,
      );
      if (foundFeed) {
        if (foundFeed.isLiked) {
          foundFeed.likeCount = Math.max(0, foundFeed.likeCount - 1);
        } else {
          foundFeed.likeCount += 1;
        }
        foundFeed.isLiked = !foundFeed.isLiked;
      }
    },
    toggleFeedCommentLike: (
      state,
      action: PayloadAction<{ feedId: string; commentId: string }>,
    ) => {
      const { feedId, commentId } = action.payload;

      const feed = state.feed.find(f => f._id === feedId);
      if (!feed) return;

      const comment = feed.comments.find(c => c._id === commentId);
      if (!comment) return;

      comment.likeCount = comment.isLiked
        ? Math.max(0, comment.likeCount - 1)
        : comment.likeCount + 1;

      comment.isLiked = !comment.isLiked;
    },
    toggleFeedSubCommentLike: (
      state,
      action: PayloadAction<{
        feedId: string;
        commentId: string;
        subCommentId: string;
      }>,
    ) => {
      const { feedId, commentId, subCommentId } = action.payload;
      const feed = state.feed.find(f => f._id === feedId);
      if (!feed) return;

      const comment = feed.comments.find(c => c._id === commentId);
      if (!comment) return;

      const sub = comment.subComments.find(s => s._id === subCommentId);
      if (!sub) return;

      sub.likeCount = sub.isLiked
        ? Math.max(0, sub.likeCount - 1)
        : sub.likeCount + 1;
      sub.isLiked = !sub.isLiked;
    },
  },
});

export const {
  setFeedCategories,
  setFeed,
  addFeedComment,
  addFeedSubComment,
  toggleLike,
  toggleFeedCommentLike,
  toggleFeedSubCommentLike,
} = feedSlice.actions;

export default feedSlice.reducer;
