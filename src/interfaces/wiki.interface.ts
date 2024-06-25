export interface Wiki {
  title: string;
  description: string;
  payload: string[];
  extraProperties: ExtraProperties;
  commentaries: string[];
}

export interface ExtraProperties {
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
