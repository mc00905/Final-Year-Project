export class ErrorWrapper extends Error {
    public details: string;
    public errorIdentifier: string;
    public message: string;
    public status: number;
  
    constructor(
      status: number,
      errorIdentifier: string,
      message: string,
      details: string = '',
    ) {
      super(message);
      this.details = details;
      this.errorIdentifier = errorIdentifier;
      this.message = message;
      this.status = status;
    }
  }
  