import { environment } from "@/lib";

export async function sendRequest({
  path,
  arg,
}: {
  path: string;
  arg: object;
}) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(arg);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  console.log({ url: environment.BASE_URL });

  console.log({ path });

  let url = `${environment.BASE_URL}/${path}`;

  return fetch(url, requestOptions).then((response) => response.json());
}
