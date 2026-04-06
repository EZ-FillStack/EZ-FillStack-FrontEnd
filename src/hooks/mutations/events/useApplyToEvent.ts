import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applyToEvent } from '@/api/events';

export function useApplyToEvent(eventId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => applyToEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myApplications'] });
      queryClient.invalidateQueries({ queryKey: ['eventDetail', eventId] });
    },
  });
}
