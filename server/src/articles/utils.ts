import { fromMarkdown } from 'mdast-util-from-markdown';
import { visit } from 'unist-util-visit';
import { CreateMediaFilesDto } from './articles.entity';

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
    const isDocument = /\.(pdf|doc|docx)$/i.test(node.url as string);

    if (!isDocument) return;

    documents.push({
      type: 'DOCUMENT',
      url: node.url,
    });
  });

  return [...images, ...documents];
};
