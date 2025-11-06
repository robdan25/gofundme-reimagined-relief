import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { testimonialsService, type Testimonial } from '@/services/testimonialsService';

interface TestimonialsProps {
  featured?: boolean;
  limit?: number;
}

export const Testimonials = ({ featured = false, limit = 6 }: TestimonialsProps) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const testimonialsList = featured
      ? testimonialsService.getRandomTestimonials(limit)
      : testimonialsService.getVerifiedTestimonials().slice(0, limit);
    setTestimonials(testimonialsList);
  }, [featured, limit]);

  const averageRating = testimonialsService.getAverageRating();
  const totalCount = testimonialsService.getTestimonialsCount();

  const renderStars = (rating: number | undefined) => {
    if (!rating) return null;
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full space-y-8">
      {/* Header Stats */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Community Stories
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mb-6">
          Real experiences from people we've helped and volunteers who made a difference
        </p>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-md">
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-primary">{totalCount}</div>
            <p className="text-sm text-muted-foreground">Community Testimonials</p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">{averageRating}</span>
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            {/* Optional image */}
            {testimonial.image && (
              <div className="h-40 overflow-hidden bg-muted">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <CardContent className="flex-1 flex flex-col p-6 space-y-4">
              {/* Stars */}
              {testimonial.rating && <div>{renderStars(testimonial.rating)}</div>}

              {/* Message */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 italic">
                "{testimonial.message}"
              </p>

              {/* Author Info */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-foreground">
                        {testimonial.name}
                      </h4>
                      {testimonial.verified && (
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                {/* Organization and Location */}
                <div className="space-y-2">
                  {testimonial.organization && (
                    <div className="text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">
                        {testimonial.organization}
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      {featured && (
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Share Your Story</h3>
          <p className="text-muted-foreground mb-6">
            Have you been helped by our relief efforts or volunteered with us? We'd love to hear
            your story!
          </p>
          <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Submit Your Testimonial
          </button>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
