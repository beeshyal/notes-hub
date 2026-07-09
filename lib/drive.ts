import { google } from "googleapis";
import { Readable } from "stream";

function getDriveClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.DRIVE_CLIENT_ID,
    process.env.DRIVE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ refresh_token: process.env.DRIVE_REFRESH_TOKEN });
  return google.drive({ version: "v3", auth: oauth2Client });
}

export async function uploadFileToDrive(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<{ id: string }> {
  const drive = getDriveClient();

  const res = await drive.files.create({
    requestBody: {
      name: filename,
      parents: process.env.DRIVE_FOLDER_ID ? [process.env.DRIVE_FOLDER_ID] : undefined
    },
    media: {
      mimeType,
      body: Readable.from(buffer)
    },
    fields: "id"
  });

  const id = res.data.id;
  if (!id) throw new Error("Drive upload did not return a file id");

  // Anyone with the link can view - required so the reader page and the
  // signed download route can both resolve the file without extra OAuth.
  await drive.permissions.create({
    fileId: id,
    requestBody: { role: "reader", type: "anyone" }
  });

  return { id };
}

export function driveDownloadUrl(fileId: string) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export function drivePreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}
