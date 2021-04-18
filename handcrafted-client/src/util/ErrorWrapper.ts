export class ErrorWrapper extends Error {
    public errorIdentifier: string;
    public message: string;
    public status: number;
  
    constructor(
      status: number,
      errorIdentifier: string,
      message: string,
    ) {
      super(message);
      this.errorIdentifier = errorIdentifier;
      this.message = message;
      this.status = status;
    }
  }
  