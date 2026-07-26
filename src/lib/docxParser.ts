import mammoth from 'mammoth';

export interface ParsedDocResult {
  text: string;
  filename: string;
  wordCount: number;
  charCount: number;
  headings: string[];
}

/**
 * Extracts plain text and section headings from an ArrayBuffer of a .docx file using mammoth.js
 */
export async function parseDocxFile(file: File): Promise<ParsedDocResult> {
  if (!file) {
    throw new Error('No file provided for parsing.');
  }

  const filename = file.name;
  const extension = filename.split('.').pop()?.toLowerCase();

  if (extension !== 'docx') {
    throw new Error('Invalid file format. Glance supports Microsoft Word (.docx) files only.');
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Extract raw text using mammoth
    const result = await mammoth.extractRawText({ arrayBuffer });
    const rawText = result.value || '';

    const cleanedText = rawText.replace(/\r\n/g, '\n').trim();

    if (!cleanedText) {
      throw new Error('The uploaded .docx file appears to be empty or contains no readable text.');
    }

    // Extract headings / structural cues (lines that look like headings)
    const lines = cleanedText.split('\n').map((l) => l.trim()).filter(Boolean);
    const headings: string[] = [];

    for (const line of lines) {
      if (
        (line.length < 80 && /^[0-9A-Z\s\-\.\:]{3,}/.test(line) && !line.endsWith('.')) ||
        /^([0-9]+\.|\#|[A-Z\s]{4,}:)/.test(line)
      ) {
        if (!headings.includes(line)) {
          headings.push(line);
        }
      }
    }

    const wordCount = cleanedText.split(/\s+/).filter(Boolean).length;
    const charCount = cleanedText.length;

    return {
      text: cleanedText,
      filename,
      wordCount,
      charCount,
      headings: headings.slice(0, 8),
    };
  } catch (err: any) {
    console.error('Error in parseDocxFile:', err);
    if (err.message && err.message.includes('Invalid file format')) {
      throw err;
    }
    throw new Error(
      `Failed to read .docx file "${filename}". Please verify it is a valid Word document.`
    );
  }
}
