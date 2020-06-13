import axios from "axios";

import { xml2js } from "xml-js";

import {
  XMLString,
  XMLEpisode,
  XMLChannel,
  EpisodeTypes,
  Season,
  MapEpisode,
  MapChannel,
  Episode,
} from "./types";
import channel from "../../components/channel";

export const getRssFeed = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

const mapEpisode: MapEpisode = ep => ({
  title: ep.title?._text ?? "",
  description: ep.description?._text ?? "",
  pubDate: ep.pubDate?._text ?? "",
  type: ep["itunes:episodeType"]?._text ?? EpisodeTypes.full,
  season: Number(ep["itunes:season"]?._text ?? 0),
  episode: Number(ep["itunes:episode"]?._text ?? 0),
  author: ep["itunes:author"]?._text ?? "",
  subtitle: ep["itunes:subtitle"]?._text ?? "",
  duration: Number(ep["itunes:duration"]?._text ?? 0),
  media: {
    url: ep.enclosure?._attributes?.url ?? "",
    type: ep.enclosure?._attributes?.type ?? "",
  },
});

const addEpisodeToSeason = (season: Season, episode: Episode) => {
  const draftSeason = {
    ...season,
  };
  const type: EpisodeTypes = episode.type ?? EpisodeTypes.full;
  draftSeason[type] = draftSeason[type]?.length ? draftSeason[type] : [];
  episode.episode = (draftSeason[type] as Episode[]).length;
  (draftSeason[type] as Episode[]).push(episode);
  return draftSeason;
};

const mapFeed: MapChannel = feed => ({
  url: feed["atom:link"]?._attributes?.href ?? "",
  title: feed.title?._text ?? "",
  description: feed.description?._text ?? "",
  image: {
    url: feed.image?.url?._text ?? "",
    title: feed.image?.title?._text ?? "",
  },
  subtitle: feed["itunes:subtitle"]?._text ?? "",
  author: feed["itunes:author"]?._text ?? "",
  episodes:
    feed?.item?.reduce((acc: Season[], curr: XMLEpisode) => {
      const ep = mapEpisode(curr);
      const seasonIdx = Math.max(0, ep.season - 1);
      acc[seasonIdx] = addEpisodeToSeason(
        acc[seasonIdx] || {
          bonus: [],
          full: [],
          trailer: [],
        },
        ep,
      );
      return acc;
    }, []) ?? [],
});

const convertToJSON = (data: XMLString) => {
  try {
    const value = xml2js(data, { compact: true }) as Partial<{
      rss?: { channel: XMLChannel };
    }>;
    if (!value) throw new Error();
    return value;
  } catch (e) {
    return { rss: { channel: { item: [] } } };
  }
};

export const convertFeed = (feedXMLString: string) => {
  const data = convertToJSON(feedXMLString);
  const feed = mapFeed(data?.rss?.channel ?? {});
  console.log(feed);
  return feed;
};
