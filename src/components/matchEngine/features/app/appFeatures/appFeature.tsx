"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/matchEngine/ui/card";
import { get_appType_params } from "./appTypeObject";
import { Spinner } from "@/components/ui/icons";

interface AppItem {
  id: string;
  image: string;
  name: string;
  description: string;
}

const AppFeature = ({ ref }: { ref: string }) => {
  const [appItem, setAppItem] = useState<AppItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [exploringId, setExploringId] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const data = await get_appType_params();
        setAppItem(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  const handleClick = (id: string) => {
    setExploringId(id);
    // Redirect can also be handled here if not handled inside <Card />
  };

  const renderLayout = () => {
    if (appItem.length === 2) {
      return (
        <div className="flex justify-center gap-8 flex-wrap">
          {appItem.map((app) => (
            <div
              key={app.id}
              className="w-full sm:w-[300px] lg:w-[340px] flex flex-col"
            >
              <Card
                image={`/matchengine/images/appType/${app.image}`}
                title={app.name}
                description={app.description}
                href={`/${ref}?system=${app.id}`}
                buttonText={
                  exploringId === app.id ? "Exploring..." : "Start Exploring"
                }
                disabled={exploringId === app.id}
                onClick={() => handleClick(app.id)}
              />
            </div>
          ))}
        </div>
      );
    }

    const gridClass =
      appItem.length === 1
        ? "grid-cols-1 justify-center"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

    return (
      <div className={`grid ${gridClass} gap-8 w-full`}>
        {appItem.map((app) => (
          <div key={app.id} className="w-full max-w-sm flex flex-col">
            <Card
              image={`/matchengine/images/appType/${app.image}`}
              title={app.name}
              description={app.description}
              href={`/${ref}?system=${app.id}`}
              buttonText={
                exploringId === app.id ? "Exploring..." : "Start Exploring"
              }
              disabled={exploringId === app.id}
              onClick={() => handleClick(app.id)}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 bg-white">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : (
        renderLayout()
      )}
    </div>
  );
};

export default AppFeature;
