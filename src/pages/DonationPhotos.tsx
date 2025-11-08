import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Upload, Image } from "lucide-react";
import { useState } from "react";
import { donationPhotosService } from "@/services/donationPhotosService";

const DonationPhotos = () => {
  const [formData, setFormData] = useState({
    submitterName: "",
    email: "",
    city: "",
    dropoffLocation: "",
    caption: "",
    consentGiven: false,
    photos: [] as File[],
  });

  const [photoPreview, setPhotoPreview] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const jamaicaCities = [
    "Kingston",
    "Montego Bay",
    "Spanish Town",
    "Port Antonio",
    "Negril",
    "Ocho Rios",
    "Mandeville",
    "May Pen",
    "Savanna-la-Mar",
    "Lucea",
    "Port Maria",
    "Other",
  ];

  const dropoffLocations = [
    "Kingston Convention Centre, Kingston",
    "Montego Bay Community Center, Montego Bay",
    "Spanish Town Relief Center, Spanish Town",
    "Port Antonio Distribution Hub, Port Antonio",
    "Negril Relief Station, Negril",
    "Grace Church, Kingston",
    "Other (specify in caption)",
  ];

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Check file count (max 3 photos)
    if (formData.photos.length + files.length > 3) {
      setErrors({
        ...errors,
        photos: "Maximum 3 photos allowed",
      });
      return;
    }

    // Add new files
    const newFiles = Array.from(files);
    setFormData({
      ...formData,
      photos: [...formData.photos, ...newFiles],
    });

    // Generate previews
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoPreview((prev) => [...prev, event.target?.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Clear error
    if (errors.photos) {
      setErrors({ ...errors, photos: "" });
    }
  };

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index),
    });
    setPhotoPreview(photoPreview.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.submitterName.trim()) {
      newErrors.submitterName = "Name is required";
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
    }
    if (!formData.dropoffLocation) {
      newErrors.dropoffLocation = "Drop-off location is required";
    }
    if (!formData.caption.trim()) {
      newErrors.caption = "Caption is required";
    }
    if (formData.photos.length === 0) {
      newErrors.photos = "At least 1 photo is required";
    }
    if (formData.photos.length > 3) {
      newErrors.photos = "Maximum 3 photos allowed";
    }
    if (!formData.consentGiven) {
      newErrors.consent = "You must give consent to display your photos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Convert photos to base64 for storage
    const photoPromises = formData.photos.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(photoPromises).then((photos) => {
      donationPhotosService.submitDonationPhotos({
        id: "",
        submitterName: formData.submitterName,
        email: formData.email,
        photos: photos,
        city: formData.city,
        dropoffLocation: formData.dropoffLocation,
        caption: formData.caption,
        consentGiven: formData.consentGiven,
        createdAt: new Date(),
        approved: false,
      });

      // Show success message
      setShowSuccess(true);

      // Reset form
      setFormData({
        submitterName: "",
        email: "",
        city: "",
        dropoffLocation: "",
        caption: "",
        consentGiven: false,
        photos: [],
      });
      setPhotoPreview([]);
      setErrors({});

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-[900px]">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Share Your Donation Photos
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-4">
            Show the impact of your relief drive! Upload photos of your group packing supplies,
            filling barrels and boxes, or at your drop-off location. Your story inspires others
            to help Jamaica rebuild after Hurricane Melissa.
          </p>
          <div className="bg-blue-50 border-l-4 border-primary p-4 mt-6">
            <p className="text-sm text-blue-900">
              <strong>📸 Photos we love:</strong> Your team with donation barrels, packing sessions,
              drive table setups, community members contributing, and drop-off moments. Please ensure
              all people in photos have given permission to be featured.
            </p>
          </div>
        </section>

        {/* Success Message */}
        {showSuccess && (
          <Alert className="mb-8 border-green-500 bg-green-50">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertDescription className="ml-4 text-green-800">
              <strong>Thank you!</strong> We've received your photos. Our team will review them
              and feature the best ones on our site soon!
            </AlertDescription>
          </Alert>
        )}

        {/* Form Section */}
        <section id="donation-photo-form" className="mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">Submit Your Photos</h2>

          <Card className="border-border bg-card">
            <CardContent className="p-8">
              <form onSubmit={handleFormSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Your Information</h3>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="Full name"
                        value={formData.submitterName}
                        onChange={(e) =>
                          setFormData({ ...formData, submitterName: e.target.value })
                        }
                        className={errors.submitterName ? "border-red-500" : ""}
                      />
                      {errors.submitterName && (
                        <p className="text-red-500 text-sm mt-1">{errors.submitterName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Donation Location</h3>

                  <div className="space-y-4">
                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        City *
                      </label>
                      <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                        <SelectTrigger className={errors.city ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                          {jamaicaCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    {/* Drop-off Location */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Drop-Off Location *
                      </label>
                      <Select value={formData.dropoffLocation} onValueChange={(value) => setFormData({ ...formData, dropoffLocation: value })}>
                        <SelectTrigger className={errors.dropoffLocation ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select drop-off location" />
                        </SelectTrigger>
                        <SelectContent>
                          {dropoffLocations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.dropoffLocation && (
                        <p className="text-red-500 text-sm mt-1">{errors.dropoffLocation}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Photos Section */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Upload Photos</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload 1-3 photos of your donation drive (barrels, boxes, packing, team, etc.)
                  </p>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4 hover:bg-muted/50 transition-colors">
                    <label htmlFor="photo-input" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Drag photos here or click to select
                          </p>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG, or GIF (Max 5MB per image)
                          </p>
                        </div>
                      </div>
                      <input
                        id="photo-input"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoSelect}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Photo Previews */}
                  {photoPreview.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {photoPreview.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-border"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            ✕
                          </button>
                          <p className="text-xs text-muted-foreground mt-1">
                            Photo {index + 1} of {photoPreview.length}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.photos && <p className="text-red-500 text-sm mb-4">{errors.photos}</p>}
                  <p className="text-xs text-muted-foreground">
                    {formData.photos.length} of 3 photos selected
                  </p>
                </div>

                {/* Caption Section */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Photo Caption</h3>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    What's the story behind these photos? *
                  </label>
                  <Textarea
                    placeholder='e.g., "Our youth group packed 4 barrels of school supplies for Jamaica!" or "Montego Bay church collected 10 boxes of medical supplies"'
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                    rows={4}
                    className={errors.caption ? "border-red-500" : ""}
                  />
                  {errors.caption && <p className="text-red-500 text-sm mt-1">{errors.caption}</p>}
                  <p className="text-xs text-muted-foreground mt-2">
                    Be specific! Include your group name, what you collected, and why it matters to you.
                  </p>
                </div>

                {/* Consent Checkbox */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Permissions</h3>
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                    <Checkbox
                      id="consent"
                      checked={formData.consentGiven}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, consentGiven: checked as boolean })
                      }
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer flex-1">
                      I confirm that all people in these photos have given permission to have their
                      photos featured on the Unbiased Relief website and social media. I understand
                      that Unbiased Relief may use these photos for fundraising and awareness purposes.
                      *
                    </label>
                  </div>
                  {errors.consent && <p className="text-red-500 text-sm mt-2">{errors.consent}</p>}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white text-lg py-3"
                >
                  Submit Photos
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">When will my photos be featured?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Our team reviews submissions within 2-3 business days. Once approved, your photos
                appear on our testimonials page and may be shared on social media!
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Do I need permission from everyone in the photos?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Yes! Make sure all people in your photos have given consent before submitting.
                This is especially important for photos with children.
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Can I upload photos later?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Absolutely! You can submit photos at any time during your relief drive or even
                after your donations have been delivered.
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">What if I want to remove my photos later?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Contact us at support@unbiasedrelief.org and we'll remove your photos promptly.
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DonationPhotos;
