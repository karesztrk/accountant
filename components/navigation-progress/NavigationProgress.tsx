import React, { useEffect, useState } from "react";
import { useInterval } from "@mantine/hooks";
import {
  setNavigationProgress,
  NavigationProgress as MantineNavigationProgress,
} from "@mantine/nprogress";
import { useRouter } from "next/router";

const NavigationProgress = () => {
  const router = useRouter();

  const [progress, setProgress] = useState(0);

  const interval = useInterval(
    () => setProgress((percent) => (percent + 5 > 90 ? percent : percent + 5)),
    200
  );

  useEffect(() => {
    const handleStart = () => {
      setProgress(0);
      interval.start();
    };

    const handleComplete = () => {
      interval.stop();
      setProgress(100);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
      interval.stop();
    };
  }, []);

  useEffect(() => {
    setNavigationProgress(progress);
  }, [progress]);

  return (
    <MantineNavigationProgress
      autoReset
      exitTimeout={500}
      initialProgress={0}
    />
  );
};

export default NavigationProgress;
