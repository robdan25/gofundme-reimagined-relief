import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Package, Share2, Clock, Facebook, Twitter, Mail, MessageCircle, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Campaign } from "@/data/campaigns";

type DriveCardProps = Campaign;

const DriveCard = ({
  id,
  slug,
  image,
  title,
  organizer,
  description,
  barrelsPacked,
  goal,
  itemsCollected,
  daysLeft,
  verified,
  urgent,
}: DriveCardProps) => {
  const navigate = useNavigate();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const percentage = Math.min((barrelsPacked / goal) * 100, 100);

  const campaignUrl = `${window.location.origin}/campaigns/${slug}`;
  const shareText = `Help support relief efforts! Check out this campaign: ${title}`;

  const handleContributeClick = () => {
    if (slug) {
      navigate(`/campaigns/${slug}`);
    }
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(campaignUrl);
    const encodedText = encodeURIComponent(shareText);

    let shareLink = "";
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "whatsapp":
        shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case "instagram":
        // Instagram doesn't have direct share URL, so copy to clipboard with message
        navigator.clipboard.writeText(`${shareText}\n\n${campaignUrl}`);
        alert("Campaign info copied! Share it in Instagram Direct or Stories.");
        setShowShareMenu(false);
        return;
      case "email":
        shareLink = `mailto:?subject=Relief Campaign: ${encodeURIComponent(title)}&body=${encodedText} ${encodedUrl}`;
        break;
      case "copy":
        navigator.clipboard.writeText(campaignUrl);
        alert("Campaign link copied to clipboard!");
        setShowShareMenu(false);
        return;
    }

    if (shareLink && platform !== "copy" && platform !== "instagram") {
      window.open(shareLink, "_blank", "width=600,height=400");
      setShowShareMenu(false);
    }
  };

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
        <div className="absolute top-3 right-3">
          <Button
            size="icon"
            variant="ghost"
            className="bg-white/90 hover:bg-white"
            onClick={() => setShowShareMenu(!showShareMenu)}
          >
            <Share2 className="w-4 h-4" />
          </Button>

          {showShareMenu && (
            <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-max">
              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm hover:bg-gray-100 border-b border-gray-100 last:border-0 transition"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                Share on Facebook
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm hover:bg-gray-100 border-b border-gray-100 last:border-0 transition"
              >
                <Twitter className="w-4 h-4 text-blue-400" />
                Share on Twitter
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm hover:bg-gray-100 border-b border-gray-100 last:border-0 transition"
              >
                <MessageCircle className="w-4 h-4 text-green-500" />
                Share on WhatsApp
              </button>
              <button
                onClick={() => handleShare("instagram")}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm hover:bg-gray-100 border-b border-gray-100 last:border-0 transition"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                Share on Instagram
              </button>
              <button
                onClick={() => handleShare("email")}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm hover:bg-gray-100 border-b border-gray-100 last:border-0 transition"
              >
                <Mail className="w-4 h-4 text-gray-600" />
                Share via Email
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm hover:bg-gray-100 transition"
              >
                <Share2 className="w-4 h-4 text-gray-600" />
                Copy Link
              </button>
            </div>
          )}
        </div>
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
            {/* Custom progress bar with red progress + blue remaining */}
            <div className="w-full h-2 bg-blue-400 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
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
        <Button
          className="flex-1 bg-primary hover:bg-primary-hover text-white"
          onClick={handleContributeClick}
        >
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
