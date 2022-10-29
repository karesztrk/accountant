declare module "pdfreader" {
  interface Line {
    x: number;
    y: number;
    w: number;
    sw: number;
    A: string;
    R: [{ T: string; S: number; TS: unknown[] }];
    oc?: unknown;
    text: string;
  }

  interface Page {
    page: number;
    width: number;
    height: number;
  }

  export class PdfReader {
    parseBuffer: (
      data: Buffer,
      cb: (err: any, item: Line | Page) => void
    ) => void;
  }
}
