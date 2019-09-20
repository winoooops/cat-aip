export interface Post {
  post: string;
  username: string;
  timestamp: string;
  avatar: string;
}

export interface Thread {
  thread_id: number;
  forum_id: number;
  title: string;
  posts: Post[];
  timestamp: string;
  alias: string;
}

export interface Forum {
  forum_id: number;
  title: string;
  threads: Thread[];
  alias: string;
}

export const Data = [
  {
    "forum_id": 1,
    "title": "cat images",
    "threads": [
      {
        "thread_id": 1,
        "forum_id": 1,
        "title": "funny pictures",
        "posts": [
          {
            "post": "some title",
            "username": "Wei",
            "timestamp": "2016-08-04T09:36:01Z",
            "avatar": "https://robohash.org/sitreprehenderitofficia.jpg?size=50x50&set=set1"
          }
        ],
        "timestamp": "2016-08-04T09:36:01Z",
        "alias": "funny-pic"
      }
    ],
    "alias": "cat-images"
  }
]
