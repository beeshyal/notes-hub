export type Faculty = "BBS" | "BBA" | "MBA";

export interface NoteDocument {
  id: string;
  title: string;
  faculty: Faculty;
  year: string; // e.g. "First Year", "Second Year"
  subject: string; // e.g. "Business Statistics"
  fileType: "pdf" | "doc" | "docx";
  driveFileId: string;
  thumbnailUrl?: string;
  pages?: number;
  uploadedAt: string; // ISO date
  downloads: number;
  views: number;
  uploader: string;
}

export interface NoteDocumentInput {
  title: string;
  faculty: Faculty;
  year: string;
  subject: string;
  fileType: "pdf" | "doc" | "docx";
  driveFileId: string;
  thumbnailUrl?: string;
  pages?: number;
  uploader: string;
}
