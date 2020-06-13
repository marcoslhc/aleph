export type XMLString = string;
export type TimeStamp = string;
export type MediaURL = string;
export enum EpisodeTypes {
  full = "full",
  bonus = "bonus",
  trailer = "trailer",
}

export enum MediaTypes {
  XM4A = "audio/x-m4a",
  MPEG = "audio/mpeg",
  quicktime = "video/quicktime",
  MP4 = "video/mp4",
  M4V = "video/x-m4v",
  PDF = "application/pdf",
}

export type Categories =
  | "Arts"
  | "Books"
  | "Design"
  | "Fashion & amp; Beauty"
  | "Food"
  | "Performing Arts"
  | "Visual Arts"
  | "Business"
  | "Careers"
  | "Entrepreneurship"
  | "Investing"
  | "Management"
  | "Marketing"
  | "Non - Profit"
  | "Comedy"
  | "Comedy Interviews"
  | "Improv"
  | "Stand-Up"
  | "Education"
  | "Courses"
  | "How To"
  | "Language Learning"
  | "Self-Improvement"
  | "Fiction"
  | "Comedy Fiction"
  | "Drama"
  | "Science Fiction"
  | "Government"
  | "History"
  | "Health & amp; Fitness"
  | "Alternative Health"
  | "Fitness"
  | "Medicine"
  | "Mental Health"
  | "Nutrition"
  | "Sexuality"
  | "Kids & amp; Family"
  | "Education for Kids"
  | "Parenting"
  | "Pets & amp; Animals"
  | "Stories for Kids"
  | "Leisure"
  | "Animation & amp; Manga"
  | "Automotive"
  | "Aviation"
  | "Crafts"
  | "Games"
  | "Hobbies"
  | "Home & amp; Garden"
  | "Video Games"
  | "Music"
  | "Music Commentary"
  | "Music History"
  | "Music Interviews"
  | "News"
  | "Business News"
  | "Daily News"
  | "Entertainment News"
  | "News Commentary"
  | "Politics"
  | "Sports News"
  | "Tech News"
  | "Religion & amp; Spirituality"
  | "Buddhism"
  | "Christianity"
  | "Hinduism"
  | "Islam"
  | "Judaism"
  | "Religion"
  | "Spirituality"
  | "Science"
  | "Astronomy"
  | "Chemistry"
  | "Earth Sciences"
  | "Life Sciences"
  | "Mathematics"
  | "Natural Sciences"
  | "Nature"
  | "Physics"
  | "Social Sciences"
  | "Society & amp; Culture"
  | "Documentary"
  | "Personal Journals"
  | "Philosophy"
  | "Places & amp; Travel"
  | "Relationships"
  | "Sports"
  | "Baseball"
  | "Basketball"
  | "Cricket"
  | "Fantasy Sports"
  | "Football"
  | "Golf"
  | "Hockey"
  | "Rugby"
  | "Running"
  | "Soccer"
  | "Swimming"
  | "Tennis"
  | "Volleyball"
  | "Wilderness"
  | "Wrestling"
  | "Technology"
  | "True Crime"
  | "TV & amp; Film"
  | "After Shows"
  | "Film History"
  | "Film Interviews"
  | "Film Reviews"
  | "TV Reviews";

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
  pubDate: XMLTextNodeType<TimeStamp>;
  "itunes:title": XMLTextNodeType;
  "itunes:season": XMLTextNodeType;
  "itunes:episode": XMLTextNodeType;
  "itunes:author": XMLTextNodeType;
  "itunes:subtitle": XMLTextNodeType;
  "itunes:summary": XMLTextNodeType;
  "itunes:duration": XMLTextNodeType;
  "itunes:episodeType": XMLTextNodeType<EpisodeTypes>;
  "itunes:image"?: {
    a: XMLAttributedType<{ href: MediaURL }>;
  };
  "content:encoded": XMLCDataType;
  guid: XMLCDataType &
    XMLAttributedType<{
      isPermaLink: string;
    }>;
  enclosure: XMLAttributedType<{
    url: MediaURL;
    length: string;
    type: MediaTypes;
  }>;
}

export interface Season {
  [EpisodeTypes.bonus]: Episode[];
  [EpisodeTypes.full]: Episode[];
  [EpisodeTypes.trailer]: Episode[];
}

export interface Episode {
  title: string;
  description: string;
  pubDate: TimeStamp;
  type: EpisodeTypes;
  image?: MediaURL;
  season: number;
  episode: number;
  author: string;
  subtitle: string;
  duration: number;
  media: {
    url: MediaURL;
    type: MediaTypes;
  };
}

export interface XMLChannel {
  "atom:link"?: XMLAttributedType<{
    href: string;
    rel: string;
    type: string;
  }>;
  title?: XMLTextNodeType;
  link?: XMLTextNodeType;
  language?: XMLTextNodeType;
  copyright?: XMLTextNodeType;
  description?: XMLTextNodeType;
  image?: {
    url?: XMLTextNodeType;
    title?: XMLTextNodeType;
    link?: XMLTextNodeType;
  };
  "itunes:explicit"?: XMLTextNodeType;
  "itunes:subtitle"?: XMLTextNodeType;
  "itunes:author"?: XMLTextNodeType;
  "itunes:summary"?: XMLTextNodeType;
  "content:encoded"?: XMLCDataType;
  "itunes:owner"?: {
    "itunes:name"?: XMLTextNodeType;
    "itunes:email"?: XMLTextNodeType;
  };
  "itunes:image"?: XMLAttributedType<{
    href?: MediaURL;
  }>;
  "itunes:category"?:
    | XMLAttributedType<XMLTextNodeType<Categories>>[]
    | XMLAttributedType<XMLTextNodeType<Categories>>[][];
  item: XMLEpisode[];
}

export interface Category {
  name: Categories;
  subcategories?: Categories;
}

export type MapEpisode = Catamorphism<XMLEpisode, Episode>;

export interface Channel {
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

export type MapChannel = Catamorphism<any | {}, Channel>;
