import { Redis } from "@upstash/redis";
import { NoteDocument, NoteDocumentInput, Faculty } from "@/types/document";

// Reads UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN, and falls back to
// KV_REST_API_URL / KV_REST_API_TOKEN (what the Vercel Marketplace "Upstash
// Redis" integration injects) automatically.
const kv = Redis.fromEnv();

const INDEX_KEY = "notes:index"; // sorted set, score = uploadedAt timestamp
const docKey = (id: string) => `notes:doc:${id}`;
const facultyIndexKey = (faculty: Faculty) => `notes:faculty:${faculty}`;

function makeId() {
  return `nh_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export async function createDocument(input: NoteDocumentInput): Promise<NoteDocument> {
  const doc: NoteDocument = {
    ...input,
    id: makeId(),
    uploadedAt: new Date().toISOString(),
    downloads: 0,
    views: 0
  };

  const score = Date.parse(doc.uploadedAt);
  await kv.hset(docKey(doc.id), doc as unknown as Record<string, unknown>);
  await kv.zadd(INDEX_KEY, { score, member: doc.id });
  await kv.zadd(facultyIndexKey(doc.faculty), { score, member: doc.id });

  return doc;
}

export async function getDocument(id: string): Promise<NoteDocument | null> {
  const doc = await kv.hgetall<Record<string, unknown>>(docKey(id));
  return doc ? (doc as unknown as NoteDocument) : null;
}

export async function incrementField(id: string, field: "downloads" | "views") {
  await kv.hincrby(docKey(id), field, 1);
}

export async function listDocuments(opts: {
  faculty?: Faculty;
  query?: string;
  limit?: number;
} = {}): Promise<NoteDocument[]> {
  const { faculty, query, limit = 60 } = opts;
  const indexKey = faculty ? facultyIndexKey(faculty) : INDEX_KEY;

  const ids = await kv.zrange<string[]>(indexKey, 0, limit - 1, { rev: true });
  if (!ids || ids.length === 0) return [];

  const docs = await Promise.all(ids.map((id) => getDocument(id)));
  let results = docs.filter((d): d is NoteDocument => d !== null);

  if (query && query.trim().length > 0) {
    const q = query.trim().toLowerCase();
    results = results.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.subject.toLowerCase().includes(q) ||
        d.year.toLowerCase().includes(q)
    );
  }

  return results;
}
