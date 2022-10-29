import type { NextApiRequest, NextApiResponse } from "next";
import { Line, PdfReader } from "pdfreader";

/**
 * Adds a new line definition or appends to the existing one.
 * @param textLines current instance of lines
 * @param item new line
 */
function addTextToLines(textLines: Line[], item: Line) {
  const existingLine = textLines.find(({ y }) => y === item.y);
  if (existingLine) {
    existingLine.text += " " + item.text;
  } else {
    textLines.push(item);
  }
}

/**
 * Extracts the text content from the given binary data. The result is a two-dimensional array where the first dimension indicates the page number
 * and the second dimension indicates the number of lines.
 * @param data binary data
 * @returns
 */
const parsePdf = (data: Buffer) =>
  new Promise<string[][]>((res, rej) => {
    const linesPerPage: Line[][] = [];
    let pageNumber = 0;
    new PdfReader().parseBuffer(data, (err: any, item) => {
      if (err) {
        rej(err);
        return;
      }

      const end = !item;
      if (end) {
        res(linesPerPage.map((page) => page.map((line) => line.text)));
      } else if ("page" in item && item.page) {
        pageNumber = item.page - 1;
        linesPerPage[pageNumber] = [];
      } else if ("text" in item && item.text) {
        addTextToLines(linesPerPage[pageNumber], item);
      }
    });
  });

/**
 * Converts a PDF file to JSON. It only accepts HTTP POST with 'application/pdf' Content-Type, and parses binary string.
 * @param req HTTP request
 * @param res HTTP post
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[][] | Record<string, string>>
) {
  if (
    req.method !== "POST" ||
    req.headers["content-type"] !== "application/pdf"
  ) {
    res.status(405);
    return;
  }

  const data = Buffer.from(req.body, "binary");
  parsePdf(data)
    .then((parsedData) => {
      res.status(200).json(parsedData);
    })
    .catch((error) => res.status(400).json({ error }));
}
