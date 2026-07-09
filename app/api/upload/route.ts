import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, isAdminEmail } from "@/lib/auth";
import { uploadFileToDrive } from "@/lib/drive";
import { createDocument } from "@/lib/kv";
import { Faculty } from "@/types/document";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!isAdminEmail(session?.user?.email)) {
    return NextResponse.json({ error: "Only admins can upload notes." }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const title = String(formData.get("title") ?? "").trim();
  const faculty = String(formData.get("faculty") ?? "") as Faculty;
  const year = String(formData.get("year") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();

  if (!file || !title || !faculty || !year || !subject) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const allowedTypes: Record<string, "pdf" | "doc" | "docx"> = {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx"
  };
  const fileType = allowedTypes[file.type];
  if (!fileType) {
    return NextResponse.json(
      { error: "Only PDF, DOC, or DOCX files are supported." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const { id: driveFileId } = await uploadFileToDrive(buffer, file.name, file.type);

  const doc = await createDocument({
    title,
    faculty,
    year,
    subject,
    fileType,
    driveFileId,
    uploader: session!.user!.email as string
  });

  return NextResponse.json({ document: doc });
}
