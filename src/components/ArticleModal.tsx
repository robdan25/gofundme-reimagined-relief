import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, X, Share2, MessageCircle, Copy, Check, Clock } from 'lucide-react';
import { NewsArticle } from '@/services/newsService';
import { timezoneService } from '@/services/timezoneService';
import { useState } from 'react';

interface ArticleModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal = ({ article, isOpen, onClose }: ArticleModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const fullContent = (article as any).fullContent || article.description;

  const handleShareWhatsApp = () => {
    const text = `${article.title}\n\n${article.description}\n\nRead more on Unbiased Relief`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyLink = () => {
    const text = `${article.title} - ${article.description}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div className="space-y-3 pb-4 border-b">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <time dateTime={new Date(article.publishedDate).toISOString()}>
                {timezoneService.formatWithTimeJamaica(new Date(article.publishedDate))}
              </time>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{timezoneService.getJamaicaOffsetString()}</span>
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

          {/* Share Options */}
          <div className="pt-4 border-t">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-muted-foreground">Share Article</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="gap-2 flex-1 min-w-fit"
                  onClick={handleShareWhatsApp}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 flex-1 min-w-fit"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Text
                    </>
                  )}
                </Button>
                {article.url && article.url !== '#' && (
                  <Button
                    variant="outline"
                    asChild
                    className="gap-2 flex-1 min-w-fit"
                  >
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Share2 className="w-4 h-4" />
                      Original
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

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
