import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Package, Share2, Clock } from "lucide-react";

interface DriveCardProps {
  image: string;
  title: string;
  organizer: string;
  description: string;
  barrelsPacked: number;
  goal: number;
  itemsCollected: number;
  daysLeft: number;
  verified?: boolean;
  urgent?: boolean;
}

const DriveCard = ({
  image,
  title,
  organizer,
  description,
  barrelsPacked,
  goal,
  itemsCollected,
  daysLeft,
  verified = false,
  urgent = false,
}: DriveCardProps) => {
  const percentage = Math.min((barrelsPacked / goal) * 100, 100);

  return (
    <Card className="group overflow-hidden hover:shadow-hover transition-all duration-300 cursor-pointer border-border bg-card">
      <div className="relative overflow-hidden aspect-[16/10]">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {verified && (
            <Badge className="bg-primary text-primary-foreground">
              Verified
            </Badge>
          )}
          {urgent && (
            <Badge className="bg-secondary text-secondary-foreground">
              Urgent
            </Badge>
          )}
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-1">by {organizer}</p>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-card-foreground">
                {barrelsPacked} barrels packed
              </span>
              <span className="text-muted-foreground">
                goal: {goal}
              </span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              <strong className="text-card-foreground">{itemsCollected.toLocaleString()}</strong> items collected
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {daysLeft} days left
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex gap-2">
        <Button className="flex-1 bg-primary hover:bg-primary-hover text-white">
          Contribute Items
        </Button>
        <Button variant="outline" size="icon">
          <Package className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DriveCard;
