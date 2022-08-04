import { useEffect, useState } from 'react';
import useSWR from 'swr';

type ActivityResponse = {
  emoji: string;
  status: string;
};

type VercelResponse = {
  active: boolean;
};

const fetcher = async <ResponseType,>(url: string): Promise<ResponseType> => {
  const response = await fetch(url);
  const data = (await response.json()) as ResponseType;

  return data;
};

const useActivity = (): ActivityResponse => {
  const vercel = useSWR<VercelResponse>('/api/vercel', fetcher);
  const [status, setStatus] = useState<ActivityResponse>({
    emoji: '🤔',
    status: 'Not sure',
  });

  useEffect(() => {
    if (!vercel.error && vercel.data?.active) {
      setStatus({
        emoji: '🚧',
        status: 'deploying code on Vercel',
      });
      return;
    }

    const date = new Date().toLocaleTimeString('en-US', {
      timeZone: 'Australia/Sydney',
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
    });

    const hour = Number(date.split(':')[0]);
    const minute = Number(date.split(':')[1]);

    const time = Number(hour * 60 + minute);

    if (time >= 0 && time <= 390) {
      setStatus({
        emoji: '😴',
        status: 'sleeping',
      });
      return;
    }

    if (time >= 420 && time <= 480) {
      setStatus({
        emoji: '💪',
        status: 'training in the gym',
      });
      return;
    }

    if (time >= 500 && time <= 509) {
      setStatus({
        emoji: '☕️',
        status: 'having a coffee',
      });
      return;
    }

    if (time >= 510 && time <= 540) {
      setStatus({
        emoji: '👟',
        status: 'going for a walk',
      });
      return;
    }

    if (time >= 780 && time <= 810) {
      setStatus({
        emoji: '🥗',
        status: 'having lunch',
      });
      return;
    }

    if (time >= 1050 && time <= 1109) {
      setStatus({
        emoji: '👟',
        status: 'going for a walk',
      });
      return;
    }

    if (time >= 1110 && time <= 1169) {
      setStatus({
        emoji: '🍔',
        status: 'having dinner',
      });
      return;
    }

    if (time >= 1170 && time <= 1229) {
      setStatus({
        emoji: '🍿',
        status: 'watching Netflix',
      });
      return;
    }

    if (time >= 1230 && time <= 1439) {
      setStatus({
        emoji: '👨‍💻',
        status: 'coding',
      });
      return;
    }

    setStatus({
      emoji: '💻',
      status: 'working',
    });
  }, [vercel.data?.active, vercel.error]);

  return status;
};

export default useActivity;
