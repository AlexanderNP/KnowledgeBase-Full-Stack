import { fromMarkdown } from 'mdast-util-from-markdown';
import { visit } from 'unist-util-visit';
import { CreateMediaFilesDto } from './articles.entity';
import type { HeadingData } from 'mdast/index';

export const getMeadiaFilesFromMarkdown = (md: string) => {
  const tree = fromMarkdown(md);

  const images: CreateMediaFilesDto[] = [];
  const documents: CreateMediaFilesDto[] = [];

  visit(tree, 'image', function (node) {
    images.push({
      type: 'IMG',
      url: node.url,
    });
  });

  visit(tree, 'link', function (node) {
    const isDocument = /\.(pdf|doc|docx)$/i.test(node.url);

    if (!isDocument) return;

    documents.push({
      type: 'DOCUMENT',
      url: node.url,
    });
  });

  return [...images, ...documents];
};

export const getHeadingsFromMarkdown = (md: string) => {
  const tree = fromMarkdown(md);

  const headings: string[] = [];

  visit(tree, 'heading', function (node) {
    if (node.depth !== 1 || node.children[0].type !== 'text') return;

    const textValue = node.children[0].value;
    headings.push(textValue);
  });

  return headings;
};
