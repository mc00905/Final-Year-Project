
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

export class ErrorWrapper400 extends ErrorWrapper {
  constructor(
    errorIdentifier: string,
    message: string,
    details: string = '',
  ) {
    super(400, errorIdentifier, message, details);
  }
}
export class ErrorWrapper404 extends ErrorWrapper {
  constructor(
    errorIdentifier: string,
    message: string,
    details: string = '',
  ) {
    super(404, errorIdentifier, message, details);
  }
}

export class ErrorWrapper412 extends ErrorWrapper {
  constructor(
    errorIdentifier: string,
    message: string,
    details: string = '',
  ) {
    super(412, errorIdentifier, message, details);
  }
}

export class ErrorWrapper500 extends ErrorWrapper {
  constructor(
    errorIdentifier: string,
    message: string,
    details: string = '',
  ) {
    super(500, errorIdentifier, message, details);
  }
}