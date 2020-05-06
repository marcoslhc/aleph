import axios from "axios";
import { xml2js } from "xml-js";

import {
  XMLString,
  XMLEpisode,
  XMLFeed,
  EpisodeTypes,
  Season,
  MapEpisode,
  MapFeed,
  Episode
} from "./types";

export const getRssFeed = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

const mapEpisode: MapEpisode = ep => ({
  title: ep.title?._text ?? '',
  description: ep.description?._text ?? '',
  pubDate: ep.pubDate?._text ?? '',
  type: ep["itunes:episodeType"]?._text ?? EpisodeTypes.full,
  season: Number(ep["itunes:season"]?._text ?? 0),
  episode: Number(ep["itunes:episode"]?._text ?? 0),
  author: ep["itunes:author"]?._text ?? "",
  subtitle: ep["itunes:subtitle"]?._text ?? '',
  duration: Number(ep["itunes:duration"]?._text ?? 0),
  media: {
    url: ep.enclosure?._attributes?.url ?? '',
    type: ep.enclosure?._attributes?.type ?? '',
  },
});

const addEpisodeToSeason = (season: Season, episode: Episode) => {
  const draftSeason = {
    ...season
  };
  draftSeason[episode.type] = draftSeason[episode.type]?.length
    ? [...draftSeason[episode.type], episode]
    : [episode];
  return draftSeason;

}

const mapFeed: MapFeed = (feed) => ({
  url: feed["atom:link"]?._attributes?.href ?? '' ,
  title: feed.title?._text ?? '',
  description: feed.description?._text ?? '',
  image: {
    url: feed.image?.url?._text ?? '',
    title: feed.image?.title?._text ?? '',
  },
  subtitle: feed["itunes:subtitle"]?._text ?? '',
  author: feed["itunes:author"]?._text ?? '',
  episodes: feed.item?.reduce((acc: Season[], curr: XMLEpisode) => {
    const ep = mapEpisode(curr);
    acc[ep.season - 1] = addEpisodeToSeason(acc[ep.season - 1] || {}, ep);
    return acc;
  }, []) ?? [],
});

const convertToJSON = (data: XMLString) => {
  return (xml2js(data, { compact: true }) as Partial<{ rss?: { channel: XMLFeed}}>);
};

export const convertFeed = (feedXMLString: string) => {
  const data = convertToJSON(feedXMLString);
  console.log(data.rss.channel)
  return mapFeed(data?.rss?.channel);
};