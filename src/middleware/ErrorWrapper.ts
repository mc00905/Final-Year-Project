interface IDetailParam {
    [index: string]: string;
  }
  
  export class ErrorWrapper extends Error {
    public context: IDetailParam[];
    public details: string;
    public errorIdentifier: string;
    public message: string;
    public status: number;
  
    constructor(
      status: number,
      errorIdentifier: string,
      message: string,
      context: IDetailParam[] = [],
      details: string = '',
    ) {
      super(message);
      this.context = context;
      this.details = details;
      this.errorIdentifier = errorIdentifier;
      this.message = message;
      this.status = status;
    }
  }