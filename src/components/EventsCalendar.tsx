import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  MapPin,
  Users,
  AlertTriangle,
  Filter,
  Mail,
  Phone,
  ExternalLink,
} from 'lucide-react';
import { eventsService, type ReliefsEvent } from '@/services/eventsService';
import { timezoneService } from '@/services/timezoneService';

export const EventsCalendar = () => {
  const [events, setEvents] = useState<ReliefsEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<ReliefsEvent[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | ReliefsEvent['category']>('all');

  useEffect(() => {
    const upcomingEvents = eventsService.getUpcomingEvents();
    setEvents(upcomingEvents);
    filterEvents('all', upcomingEvents);
  }, []);

  const filterEvents = (category: 'all' | ReliefsEvent['category'], eventsList: ReliefsEvent[] = events) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredEvents(eventsList);
    } else {
      setFilteredEvents(eventsList.filter((event) => event.category === category));
    }
  };

  const getCategoryColor = (category: ReliefsEvent['category']) => {
    switch (category) {
      case 'collection':
        return 'bg-blue-100 text-blue-800';
      case 'distribution':
        return 'bg-green-100 text-green-800';
      case 'volunteer':
        return 'bg-purple-100 text-purple-800';
      case 'fundraiser':
        return 'bg-orange-100 text-orange-800';
      case 'workshop':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: ReliefsEvent['category']) => {
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1');
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Relief Events Calendar</h2>
        <p className="text-muted-foreground">Upcoming volunteer opportunities, collections, and distributions in Jamaica</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => filterEvents('all')}
          className={activeFilter === 'all' ? 'bg-primary hover:bg-primary-hover text-white' : ''}
        >
          <Filter className="w-4 h-4 mr-2" />
          All Events
        </Button>
        <Button
          variant={activeFilter === 'collection' ? 'default' : 'outline'}
          size="sm"
          onClick={() => filterEvents('collection')}
          className={activeFilter === 'collection' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
        >
          Collection Drives
        </Button>
        <Button
          variant={activeFilter === 'distribution' ? 'default' : 'outline'}
          size="sm"
          onClick={() => filterEvents('distribution')}
          className={activeFilter === 'distribution' ? 'bg-green-600 hover:bg-green-700 text-white' : ''}
        >
          Distribution
        </Button>
        <Button
          variant={activeFilter === 'volunteer' ? 'default' : 'outline'}
          size="sm"
          onClick={() => filterEvents('volunteer')}
          className={activeFilter === 'volunteer' ? 'bg-purple-600 hover:bg-purple-700 text-white' : ''}
        >
          Volunteer
        </Button>
        <Button
          variant={activeFilter === 'workshop' ? 'default' : 'outline'}
          size="sm"
          onClick={() => filterEvents('workshop')}
          className={activeFilter === 'workshop' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : ''}
        >
          Workshops
        </Button>
      </div>

      {/* Events List */}
      <div className="grid gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Card
              key={event.id}
              className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 ${
                event.category === 'collection'
                  ? 'border-l-blue-500'
                  : event.category === 'distribution'
                    ? 'border-l-green-500'
                    : event.category === 'volunteer'
                      ? 'border-l-purple-500'
                      : event.category === 'workshop'
                        ? 'border-l-indigo-500'
                        : 'border-l-gray-500'
              }`}
            >
              <div className="grid md:grid-cols-[1fr_2fr] gap-6 p-6">
                {/* Event Image */}
                {event.image && (
                  <div className="h-48 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Event Details */}
                <div className="flex flex-col justify-between space-y-4">
                  <div>
                    {/* Header with badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getCategoryColor(event.category)}>
                        {getCategoryLabel(event.category)}
                      </Badge>
                      {event.urgent && (
                        <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Urgent
                        </Badge>
                      )}
                    </div>

                    {/* Title and description */}
                    <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{event.description}</p>

                    {/* Event Info Grid */}
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">
                            {timezoneService.formatWithTimeJamaica(event.date)}
                          </p>
                          <p className="text-xs text-muted-foreground">Jamaica Time</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">{event.location}</p>
                        </div>
                      </div>

                      {event.attendees && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <p className="text-foreground">
                            ~{event.attendees} expected attendees
                          </p>
                        </div>
                      )}

                      {event.organizer && (
                        <div>
                          <p className="text-xs text-muted-foreground">Organized by</p>
                          <p className="font-medium text-foreground">{event.organizer}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact and Action Buttons */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {event.contactEmail && (
                        <a href={`mailto:${event.contactEmail}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Mail className="w-4 h-4" />
                            Email
                          </Button>
                        </a>
                      )}
                      {event.contactPhone && (
                        <a href={`tel:${event.contactPhone}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Phone className="w-4 h-4" />
                            Call
                          </Button>
                        </a>
                      )}
                      {event.link && (
                        <a href={event.link} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Learn More
                          </Button>
                        </a>
                      )}
                      <Button className="bg-primary hover:bg-primary-hover text-white gap-2">
                        Register Interest
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-foreground">No Events Found</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No upcoming events matching the selected filter. Check back soon for new relief activities!
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Info Banner */}
      {eventsService.getUrgentEvents().length > 0 && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Urgent Events Available</p>
                <p className="text-sm text-red-700 mt-1">
                  There are urgent relief activities happening soon that need volunteers and supplies.
                  Please check the events above and register to help!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventsCalendar;
