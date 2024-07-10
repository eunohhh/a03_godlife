export type Post = {
  posts: {
    Row: {
      avatar: string | null;
      contents: string | null;
      created_at: string;
      email: string;
      id: string;
      nickname: string;
    };
    Insert: {
      avatar?: string | null;
      contents?: string | null;
      created_at?: string;
      email: string;
      id?: string;
      nickname: string;
    };
    Update: {
      avatar?: string | null;
      contents?: string | null;
      created_at?: string;
      email?: string;
      id?: string;
      nickname?: string;
    };
    Relationships: [];
  };
};

export type User = {
  users: {
    Row: {
      avatar: string | null;
      created_at: string;
      email: string;
      id: string;
      introduction: string | null;
      nickname: string | null;
    };
    Insert: {
      avatar?: string | null;
      created_at?: string;
      email: string;
      id?: string;
      introduction?: string | null;
      nickname?: string | null;
    };
    Update: {
      avatar?: string | null;
      created_at?: string;
      email?: string;
      id?: string;
      introduction?: string | null;
      nickname?: string | null;
    };
  };
};
