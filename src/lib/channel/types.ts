export type XMLString = string;

export enum EpisodeTypes {
  full = "full",
  bonus = "bonus",
  trailer = "trailed",
}

export interface Catamorphism<T1, T2> {
  (x: T1): T2;
}
export interface XMLTextNodeType<T = string> {
  _text: T;
}

export interface XMLAttributedType<T = {}> {
  _attributes: T;
}

export interface XMLCDataType {
  _cdata: string;
}

export interface XMLEpisode {
  title: XMLTextNodeType;
  description: XMLTextNodeType;
  pubDate: XMLTextNodeType;
  "itunes:title": XMLTextNodeType;
  "itunes:season": XMLTextNodeType;
  "itunes:episode": XMLTextNodeType;
  "itunes:author": XMLTextNodeType;
  "itunes:subtitle": XMLTextNodeType;
  "itunes:summary": XMLTextNodeType;
  "itunes:duration": XMLTextNodeType;
  "itunes:episodeType": XMLTextNodeType<EpisodeTypes>;
  "content:encoded": XMLCDataType;
  guid: XMLCDataType &
    XMLAttributedType<{
      isPermaLink: string;
    }>;
  enclosure: XMLAttributedType<{
    url: string;
    length: string;
    type: string;
  }>;
}

export interface Season {
  [EpisodeTypes.bonus]?: Episode[];
  [EpisodeTypes.full]?: Episode[];
  [EpisodeTypes.trailer]?: Episode[];
}

export interface Episode {
  title: string;
  description: string;
  pubDate: string;
  type: EpisodeTypes;
  season: number;
  episode: number;
  author: string;
  subtitle: string;
  duration: number;
  media: {
    url: string;
    type: string;
  };
}

export interface XMLFeed {
  "atom:link": XMLAttributedType<{
    href: string;
    rel: string;
    type: string;
  }>;
  title: XMLTextNodeType;
  link: XMLTextNodeType;
  language: XMLTextNodeType;
  copyright: XMLTextNodeType;
  description: XMLTextNodeType;
  image: {
    url: XMLTextNodeType;
    title: XMLTextNodeType;
    link: XMLTextNodeType;
  };
  "itunes:explicit": XMLTextNodeType;
  "itunes:subtitle": XMLTextNodeType;
  "itunes:author": XMLTextNodeType;
  "itunes:summary": XMLTextNodeType;
  "content:encoded": XMLCDataType;
  "itunes:owner": {
    "itunes:name": XMLTextNodeType;
    "itunes:email": XMLTextNodeType;
  };
  "itunes:image": XMLAttributedType<{
    href: string;
  }>;
  "itunes:category": XMLAttributedType<XMLTextNodeType>[];
  item: XMLEpisode[];
}

export type MapEpisode = Catamorphism<XMLEpisode, Episode>;

export interface Feed {
  url: string;
  title: string;
  description: string;
  image: {
    url: string;
    title: string;
  };
  subtitle: string;
  author: string;
  episodes: Season[];
}

export type MapFeed = Catamorphism<XMLFeed, Feed>;
