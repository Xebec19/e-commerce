import { ILoginPayload, IRegisterPayload } from "@/interfaces/auth.interface";
import { environment } from "@/lib";

export async function registerHttp({
  firstName,
  lastName,
  email,
  phone,
  password,
}: IRegisterPayload) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let hashedPassword = btoa(password);

  var raw = JSON.stringify({
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    password: hashedPassword,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  let url = `${environment.BASE_URL}/auth/register`;

  return fetch(url, requestOptions).then((response) => response.json());
}

export async function loginHttp({ email, password }: ILoginPayload) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: email,
    password: btoa(password),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  let url = `${environment.BASE_URL}/auth/login`;

  return fetch(url, requestOptions).then((response) => response.json());
}
