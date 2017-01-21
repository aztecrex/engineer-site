import React from 'react';
import { latest } from '../articles';
import ArticleContent from './ArticleContent';

const LatestArticleContent = () => (<ArticleContent id={latest()} />);

export default LatestArticleContent;
