export interface CommentInterface {
  id?: number;
  userId: number;
  message: string;
  parentId: number;
  taskId: number;
}
