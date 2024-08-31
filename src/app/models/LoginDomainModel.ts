export class LoginDomainModel {
    UserName: string;
    Password: string;
    ClientId: string;
    ReturnUrl: string;
    RememberMe: boolean;
    LoginTextPage: string;
    PVM: ForgotPasswordDomainModel;
  }
  
  class AccountForgotPasswordModel {
    Email: string;
  }
  
  class AccountResetPasswordModel {
    Password: string;
    PasswordConfirm: string;
  }
  
  class AccountRegistrationModel {
    Username: string;
    Email: string;
    EmailConfirm: string;
    Password: string;
    PasswordConfirm: string;
  }
  export class ForgotPasswordDomainModel {
    FirstName: string;
    LastName: string;
    Password: string;
    LoginId: string;
    Email: string;
    QId?: number | null;
    SecurityQueslist: SecurityQuestionDomainModel[];
    Answer: string;
    ClientDBName: string;
  }
  export class SecurityQuestionDomainModel {
    QId: number;
    QName: string;
}
  