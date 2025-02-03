export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  user_id: number;
};

export type NewTask = {
  title: string;
  description: string;
  completed: boolean;
  user_id: number;
};
