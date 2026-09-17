import React from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
  inverted?: boolean;
}

/**
 * Renders executive assistant responses as clean, plain readable text.
 * Strips raw markdown syntax (such as |---| table syntax, ### headers, and raw asterisks)
 * and formats them into clean paragraphs, headings, bullet lists, and simple clean data cards.
 */
export const FormattedText: React.FC<FormattedTextProps> = ({ text, className = '', inverted = false }) => {
  if (!text) return null;

  // Split text into lines
  const rawLines = text.split('\n');

  // Pre-process: detect table rows and transform them into clean readable key-value bullets
  const processedLines: string[] = [];
  let inTable = false;
  let headers: string[] = [];

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();

    // Check if table row
    if (line.startsWith('|') && line.endsWith('|')) {
      // Ignore divider lines like |---|---|---|
      if (line.replace(/[\s|:-]/g, '').length === 0) {
        continue;
      }

      const cells = line
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim().replace(/^\*\*(.*)\*\*$/, '$1'));

      if (!inTable) {
        inTable = true;
        headers = cells;
        // Skip emitting raw table headers
        continue;
      } else {
        // Data row in table -> convert to clean bullet point
        if (cells.length > 0) {
          const title = cells[0];
          const remaining = cells
            .slice(1)
            .map((val, idx) => {
              const header = headers[idx + 1] ? `${headers[idx + 1]}: ` : '';
              return `${header}${val}`;
            })
            .join(' · ');
          processedLines.push(`• ${title}${remaining ? ` — ${remaining}` : ''}`);
        }
        continue;
      }
    } else {
      inTable = false;
    }

    // Skip horizontal rules like *** or ---
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(line)) {
      continue;
    }

    processedLines.push(rawLines[i]);
  }

  // Group lines into sections
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = (keyPrefix: number) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${keyPrefix}`} className="space-y-1.5 my-2 pl-1">
          {currentList.map((item, idx) => (
            <li key={idx} className={`flex items-start gap-2 ${inverted ? 'text-amber-50' : 'text-[#5A453D]'}`}>
              <span className={`font-bold shrink-0 mt-0.5 ${inverted ? 'text-amber-200' : 'text-[#C0824B]'}`}>•</span>
              <span className="flex-1 leading-relaxed">{renderInlineFormatted(item, inverted)}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  processedLines.forEach((line, index) => {
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      flushList(index);
      return;
    }

    // Header line (### or ## or #)
    if (/^#{1,6}\s+/.test(trimmed)) {
      flushList(index);
      const cleanHeader = trimmed.replace(/^#{1,6}\s+/, '').replace(/^\*\*(.*)\*\*$/, '$1');
      elements.push(
        <h4
          key={`h-${index}`}
          className={`font-bold text-sm mt-3.5 mb-1.5 flex items-center gap-1.5 tracking-tight ${
            inverted ? 'text-white' : 'text-[#2A1816]'
          }`}
        >
          {cleanHeader}
        </h4>
      );
      return;
    }

    // Bullet point line (• or * or -)
    if (/^([•*\-]|(\d+\.))\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^([•*\-]|(\d+\.))\s+/, '');
      currentList.push(itemText);
      return;
    }

    // Regular paragraph
    flushList(index);
    elements.push(
      <p key={`p-${index}`} className={`leading-relaxed my-1 ${inverted ? 'text-white' : 'text-[#5A453D]'}`}>
        {renderInlineFormatted(trimmed, inverted)}
      </p>
    );
  });

  flushList(processedLines.length);

  return <div className={`space-y-1 text-xs ${className}`}>{elements}</div>;
};

/**
 * Helper to render clean inline bolding and emphasis without raw markdown symbols
 */
function renderInlineFormatted(text: string, inverted: boolean = false): React.ReactNode {
  // Replace bold markdown like **text** or __text__ with strong tags
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3|(`)(.*?)\5/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[2]) {
      // Bold
      parts.push(
        <strong key={match.index} className={`font-semibold ${inverted ? 'text-white' : 'text-[#2A1816]'}`}>
          {match[2]}
        </strong>
      );
    } else if (match[4]) {
      // Italic / emphasis
      parts.push(
        <span key={match.index} className={`font-medium ${inverted ? 'text-amber-100' : 'text-[#8C5234]'}`}>
          {match[4]}
        </span>
      );
    } else if (match[6]) {
      // Code / identifier
      parts.push(
        <span
          key={match.index}
          className={`font-mono px-1 py-0.5 rounded text-[11px] ${
            inverted ? 'bg-black/20 text-white' : 'bg-[#FAF7F2] text-[#8C5234] border border-[#E6DDD3]'
          }`}
        >
          {match[6]}
        </span>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
