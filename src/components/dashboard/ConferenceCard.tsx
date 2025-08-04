import React from 'react';
import { Calendar, Clock, Users, MapPin, DollarSign, Eye, Edit, Play, Settings } from 'lucide-react';
import { Conference, UserRole } from '../../types';

interface ConferenceCardProps {
  conference: Conference;
  userRole: UserRole;
}

export function ConferenceCard({ conference, userRole }: ConferenceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'published': return 'bg-blue-100 text-blue-800';
      case 'live': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDuration = () => {
    const start = new Date(conference.start_date);
    const end = new Date(conference.end_date);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day';
    return `${diffDays} days`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(conference.status)}`}>
                {conference.status}
              </span>
              {conference.is_paid && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <DollarSign className="w-3 h-3 mr-1" />
                  Paid
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {conference.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {conference.description}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{formatDate(conference.start_date)} - {formatDate(conference.end_date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{getDuration()}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{conference.timezone}</span>
          </div>

          {conference.max_attendees && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>Max {conference.max_attendees} attendees</span>
            </div>
          )}

          {conference.is_paid && conference.ticket_price && (
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>${conference.ticket_price}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            {userRole === 'organizer' && (
              <>
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </button>
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  <Settings className="w-3 h-3 mr-1" />
                  Manage
                </button>
              </>
            )}
            
            {(userRole === 'attendee' || userRole === 'speaker') && (
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                <Eye className="w-3 h-3 mr-1" />
                View Details
              </button>
            )}
          </div>

          {conference.status === 'live' && (
            <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
              <Play className="w-3 h-3 mr-1" />
              Join Live
            </button>
          )}
        </div>
      </div>
    </div>
  );
}