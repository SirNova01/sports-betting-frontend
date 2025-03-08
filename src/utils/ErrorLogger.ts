export class ErrorLogger {
    public static log(error: string): void {
      // e.g., console.error, or send to external logging service
      console.error(`[ErrorLogger]: ${error}`);
    }
  }
  