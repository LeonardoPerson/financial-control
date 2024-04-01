import { ExchangeRateCommon, ExchangeRatesApiData } from "../types";

export function deletePropertyFromObject(object: ExchangeRatesApiData, property: string) {
  delete object[property];
}

export function generateCurrencies(object: ExchangeRatesApiData) {
  const currencieObjectArray: ExchangeRateCommon[] = [];
  Object.keys(object).forEach((item) => {
    currencieObjectArray.push(object[item]);
  });
  const currenciesData = currencieObjectArray.map((currencie) => (
    currencie.code
  ));
  return currenciesData;
}

export function loadingInformation() {
  return (
    <div>Carregando...</div>
  );
}

export function emailValidationTest(inputEmail: string) {
  const emailTester = /\S+@\S+\.\S+/;
  const emailVerification = emailTester.test(inputEmail);
  return emailVerification;
}

export function passwordValidationTest(inputPassword: string) {
  const allowedPasswordLenght = 6;
  const passwordLowerCaseTest = /[A-Z]/;
  const passwordVerification = inputPassword.length >= allowedPasswordLenght && passwordLowerCaseTest.test(inputPassword);
  return passwordVerification;
}
