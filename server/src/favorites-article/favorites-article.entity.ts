export class FavoritesArticle {
  id: string;

  article: {
    id: string;
    title: string;
  };

  userId: string;

  savedAt: Date;
}
