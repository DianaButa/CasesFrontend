export class ClientiDTO {
  id?: number;  // id rămâne opțional
  firstName: string;
  lastName: string;
  email: string;

  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    // nu mai avem nevoie de id aici pentru un client nou
  }
}
