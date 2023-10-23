import md5 from "md5";

import { IRegisterPayload } from "@/interfaces/auth.interface";
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

  let hashedPassword = md5(password);

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

  console.log({ url });

  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
