import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, X } from 'lucide-react';
import { NewsArticle } from '@/services/newsService';

interface ArticleModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal = ({ article, isOpen, onClose }: ArticleModalProps) => {
  if (!article) return null;

  const fullContent = (article as any).fullContent || article.description;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <Badge className="mb-4 bg-primary">
                {article.source}
              </Badge>
              <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight">
                {article.title}
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Article Metadata */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground pb-4 border-b">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={new Date(article.publishedDate).toISOString()}>
                {new Date(article.publishedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  meridiem: 'short',
                })}
              </time>
            </div>
          </div>

          {/* Article Image */}
          {article.imageUrl && (
            <div className="w-full h-96 rounded-lg overflow-hidden bg-muted">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
              {fullContent}
            </p>
          </div>

          {/* Article Source Link - if available and not a placeholder */}
          {article.url && article.url !== '#' && (
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                asChild
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Original Article
                </a>
              </Button>
            </div>
          )}

          {/* Close Button */}
          <div className="pt-4 border-t">
            <Button
              variant="default"
              className="w-full bg-primary hover:bg-primary-hover text-white"
              onClick={onClose}
            >
              Close Article
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleModal;
