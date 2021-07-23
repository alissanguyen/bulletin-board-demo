interface PostItNoteData {
  id: string;
  title: string;
  description: string;
  createdAtMillis: Date;
  isCompleted: boolean;
  category: string;
}


interface CategoryFilter {
  value: string;
  label: string;
}