import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CATEGORY_ITEM, COMPANY, COMMENT, SUB_COMMENT } from '../types.ts';

type State = {
  categories: CATEGORY_ITEM[];
  companies: COMPANY[];
};

const initialState: State = {
  categories: [],
  companies: [],
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyCategories: (state, action: PayloadAction<CATEGORY_ITEM[]>) => {
      state.categories = action.payload;
    },
    setCompanies: (state, action: PayloadAction<COMPANY[]>) => {
      state.companies = action.payload;
    },
    addCompany: (state, action: PayloadAction<COMPANY>) => {
      state.companies.push(action.payload);
    },
    addCompanyComment: (
      state,
      action: PayloadAction<{ companyId: string; comment: COMMENT }>,
    ) => {
      const foundCompany = state.companies.find(
        item => item._id === action.payload.companyId,
      );
      if (foundCompany) {
        foundCompany.comments.push(action.payload.comment);
      }
    },
    addCompanySubComment: (
      state,
      action: PayloadAction<{
        companyId: string;
        commentId: string;
        comment: SUB_COMMENT;
      }>,
    ) => {
      const company = state.companies.find(
        item => item._id === action.payload.companyId,
      );
      if (!company) return;
      const foundComment = company.comments.find(
        item => item._id === action.payload.commentId,
      );
      if (!foundComment) return;
      foundComment.subComments.push(action.payload.comment);
    },
    toggleCompanyLike: (
      state,
      action: PayloadAction<{ companyId: string }>,
    ) => {
      const { companyId } = action.payload;
      const company = state.companies.find(item => item._id === companyId);
      if (!company) return;

      company.likeCount = company.isLiked
        ? Math.max(0, company.likeCount - 1)
        : company.likeCount + 1;
      company.isLiked = !company.isLiked;
    },
    toggleCompanyCommentLike: (
      state,
      action: PayloadAction<{ companyId: string; commentId: string }>,
    ) => {
      const { companyId, commentId } = action.payload;

      const company = state.companies.find(c => c._id === companyId);
      if (!company) return;

      const comment = company.comments.find(c => c._id === commentId);
      if (!comment) return;

      comment.likeCount = comment.isLiked
        ? Math.max(0, comment.likeCount - 1)
        : comment.likeCount + 1;

      comment.isLiked = !comment.isLiked;
    },
    toggleCompanySubCommentLike: (
      state,
      action: PayloadAction<{
        companyId: string;
        commentId: string;
        subCommentId: string;
      }>,
    ) => {
      const { companyId, commentId, subCommentId } = action.payload;
      const company = state.companies.find(c => c._id === companyId);
      if (!company) return;

      const comment = company.comments.find(c => c._id === commentId);
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
  setCompanyCategories,
  setCompanies,
  addCompany,
  addCompanyComment,
  addCompanySubComment,
  toggleCompanyLike,
  toggleCompanyCommentLike,
  toggleCompanySubCommentLike,
} = companySlice.actions;

export default companySlice.reducer;
