import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Conference } from '../types';
import { useAuth } from '../contexts/AuthContext';

export function useConferences() {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userRole } = useAuth();

  useEffect(() => {
    if (user) {
      fetchConferences();
    }
  }, [user, userRole]);

  const fetchConferences = async () => {
    try {
      let query = supabase.from('conferences').select('*');

      // Filter based on user role
      if (userRole === 'organizer') {
        query = query.eq('organizer_id', user?.id);
      } else if (userRole === 'attendee') {
        // Get conferences where user is registered
        const { data: registrations } = await supabase
          .from('registrations')
          .select('conference_id')
          .eq('user_id', user?.id)
          .eq('status', 'confirmed');

        if (registrations) {
          const conferenceIds = registrations.map(r => r.conference_id);
          query = query.in('id', conferenceIds);
        }
      } else {
        // For speakers and general view, show published conferences
        query = query.eq('status', 'published');
      }

      const { data, error } = await query.order('start_date', { ascending: false });

      if (error) throw error;
      setConferences(data || []);
    } catch (error) {
      console.error('Error fetching conferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const createConference = async (conferenceData: Omit<Conference, 'id' | 'created_at' | 'updated_at' | 'organizer_id'>) => {
    try {
      const { data, error } = await supabase
        .from('conferences')
        .insert([{
          ...conferenceData,
          organizer_id: user?.id,
        }])
        .select()
        .single();

      if (error) throw error;
      
      setConferences(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error creating conference:', error);
      throw error;
    }
  };

  const updateConference = async (id: string, updates: Partial<Conference>) => {
    try {
      const { data, error } = await supabase
        .from('conferences')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setConferences(prev => 
        prev.map(conf => conf.id === id ? { ...conf, ...data } : conf)
      );
      return data;
    } catch (error) {
      console.error('Error updating conference:', error);
      throw error;
    }
  };

  return {
    conferences,
    loading,
    createConference,
    updateConference,
    refetch: fetchConferences,
  };
}